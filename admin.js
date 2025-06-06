import Booking from "./models/booking.model.js";

export const getAllBookings = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await Booking.countDocuments();

  const bookings = await Booking.find()
    .sort({ startTime: 1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    bookings,
  };
};

export const getBookingByDate = async (dateISO) => {
  if (!dateISO || isNaN(Date.parse(dateISO))) {
    throw new Error({
      success: false,
      message: "Invalid date format. Please provide a valid ISO date string.",
    });
  }

  const dateObj = new Date(dateISO);
  const startOfDay = new Date(dateObj.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(dateObj.setUTCHours(23, 59, 59, 999));

  const bookings = await Booking.find({
    startTime: { $gte: startOfDay, $lt: endOfDay },
  }).sort({ startTime: 1 });

  return bookings;
};
