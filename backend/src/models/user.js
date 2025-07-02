// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength:6,
  },
  image:{
        type: String,
        default: "",
    },
    address:{
      type:String,
      default:"",
    },
    gender:{
      type:String,
      default:""
    },
    dob:{
      type:String,
      default:""
    },
    phone:{
      type:String,
      default:""
    },
  role: {
    type: String,
    enum: ['patient', 'admin'],
    default: 'patient'
  },
},{timestamps:true,minimize:false});

export default mongoose.model('User', userSchema);
