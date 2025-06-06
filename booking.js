import Booking from "./models/booking.model.js";
import { getConfig } from "./settings.js";
import { isTimeWithinRange, generateAvailableSlots } from "./utils.js";

export async function bookSlot(userId, startTimeISO, duration) {
  const allowedDurations = [15, 30, 60];
  if (!allowedDurations.includes(duration)) {
    throw new Error({ success: false, message: "Invalid duration." });
  }

  const startTime = new Date(startTimeISO);
  const endTime = new Date(startTime.getTime() + duration * 60000);
  const config = await getConfig();

  const day = startTime.toLocaleString("en-US", { weekday: "long" });
  if (config.offDays.includes(day)) {
    throw new Error({ success: false, message: `${day} is a day off.` });
  }

  if (!isTimeWithinRange(startTime, endTime, config.availableTime)) {
    throw new Error({
      success: false,
      message: "Time is outside of available hours.",
    });
  }

  const conflict = await Booking.findOne({
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      {
        startTime: { $lte: startTime },
        endTime: { $gte: endTime },
      },
    ],
  });

  if (conflict) {
    throw new Error({ success: false, message: "Time slot already booked." });
  }

  const booking = new Booking({ userId, startTime, endTime });
  await booking.save();
  return booking;
}

export async function getAvailableSlots(dateISO) {
  if (!dateISO || isNaN(Date.parse(dateISO))) {
    throw new Error({
      success: false,
      message: "Invalid date format. Please provide a valid ISO date string.",
    });
  }
  const dateObj = new Date(dateISO);

  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const dateStringUTC = `${year}-${month}-${day}`;

  const config = await getConfig();

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekUTC = weekdays[dateObj.getUTCDay()];

  if (config.offDays && config.offDays.includes(dayOfWeekUTC)) {
    return [];
  }

  const slots = generateAvailableSlots(dateStringUTC, config.availableTime);

  if (slots.length === 0) {
    return [];
  }
  const bookings = await Booking.find({
    startTime: { $gte: slots[0].start, $lt: slots[slots.length - 1].end },
  });

  // Filter out booked slots
  const filtered = slots.filter((slot) => {
    return !bookings.some(
      (b) => b.startTime < slot.end && b.endTime > slot.start
    );
  });

  return filtered.map((slot) => ({
    start: slot.start.toISOString(),
    end: slot.end.toISOString(),
  }));
}
