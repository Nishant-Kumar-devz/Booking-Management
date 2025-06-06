import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: String,
  startTime: Date,
  endTime: Date
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);