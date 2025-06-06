import Booking from './models/booking.model.js';

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