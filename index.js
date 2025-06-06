import { setAvailableTime, setDayOffs, getConfig } from './settings.js';
import { bookSlot, getAvailableSlots } from './booking.js';
import { getAllBookings } from './admin.js';

export default class BookingSDK {
  constructor({ dbConnection }) {
    if (!dbConnection) throw new Error("MongoDB connection required");
  }

  setAvailableTime(start, end) {
    return setAvailableTime(start, end);
  }

  setDayOffs(days) {
    return setDayOffs(days);
  }

  getConfig() {
    return getConfig();
  }

  bookSlot({ userId, startTime, duration }) {
    return bookSlot(userId, startTime, duration);
  }

  getAvailableSlots(date) {
    return getAvailableSlots(date);
  }

  getAllBookings(page, limit) {
    return getAllBookings(page, limit);
  }
}