import mongoose from 'mongoose';

const configSchema = new mongoose.Schema({
  availableTime: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  offDays: [{ type: String }]
});

export default mongoose.models.Config || mongoose.model('Config', configSchema);