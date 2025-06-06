import Booking from './models/booking.model.js';
import { getConfig } from './settings.js';
import { isTimeWithinRange, generateAvailableSlots } from './utils.js';

export async function bookSlot(userId, startTimeISO, duration) {
  const allowedDurations = [15, 30, 60];
  if (!allowedDurations.includes(duration)) {
    throw new Error('Invalid duration.');
  }

  const startTime = new Date(startTimeISO);
  const endTime = new Date(startTime.getTime() + duration * 60000);
  const config = await getConfig();

  const day = startTime.toLocaleString('en-US', { weekday: 'long' });
  if (config.offDays.includes(day)) {
    throw new Error(`${day} is a day off.`);
  }

  if (!isTimeWithinRange(startTime, endTime, config.availableTime)) {
    throw new Error('Time is outside of available hours.');
  }

  const conflict = await Booking.findOne({
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      {
        startTime: { $lte: startTime },
        endTime: { $gte: endTime }
      }
    ]
  });

  if (conflict) {
    throw new Error('Time slot already booked.');
  }

  const booking = new Booking({ userId, startTime, endTime });
  await booking.save();
  return booking;
}

export async function getAvailableSlots(dateISO) {
  const date = new Date(dateISO);
  const config = await getConfig();
  const day = date.toLocaleString('en-US', { weekday: 'long' });

  if (config.offDays.includes(day)) {
    return [];
  }

  const slots = generateAvailableSlots(date, config.availableTime);
  const bookings = await Booking.find({
    startTime: { $gte: slots[0]?.start, $lte: slots[slots.length - 1]?.end }
  });

  const filtered = slots.filter(slot => {
    return !bookings.find(b =>
      (b.startTime < slot.end && b.endTime > slot.start)
    );
  });

  return filtered.map(slot => ({
    start: slot.start.toISOString(),
    end: slot.end.toISOString()
  }));
}