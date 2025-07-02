import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  slotDate: {
    type: String,
    required: true, // Format: "22_8_2024"
  },
  slotTime: {
    type: String,
    required: true, // Format: "10:30 AM"
  },
  userData: {
    type: Object,
    default: {}, // or you can define fields if you prefer (see note below)
  },
  docData: {
    type: Object,
    default: {}, // or define structure
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Number, // UNIX timestamp like 1724299400116
    required: true,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  minimize: false
});

export default mongoose.model('Appointment', appointmentSchema);
