import { setAvailableTime, setDayOffs, getConfig } from "./settings.js";
import { bookSlot, getAvailableSlots } from "./booking.js";
import { getAllBookings, getBookingByDate } from "./admin.js";
import mongoose from "mongoose";

export default class BookingSDK {
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      throw new BookingSDKError(
        "Mongoose is not connected. Please ensure mongoose.connect() is called before using BookingSDK methods."
      );
    }
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

  getBookingByDate(date) {
    return getBookingByDate(date);
  }
}
