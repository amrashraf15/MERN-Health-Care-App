import mongoose from 'mongoose';
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, default: "" },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, required: true },
  fees: { type: Number, required: true },
  address: {
    address1: { type: String, required: true },
    address2: { type: String, required: true }
  },
  slots_booked: {
    type: Object,
    default: {}
  },
  image: {
    type: String,
    default: ""
  },
}, { timestamps: true, minimize: false });


export default mongoose.model('Doctor', doctorSchema);