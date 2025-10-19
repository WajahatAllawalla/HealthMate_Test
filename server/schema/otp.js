import mongoose from "mongoose";
const schema = new mongoose.Schema({
  otp: Number,
email: String,
isUsed: {
  type: Boolean,
  default: false
}

})

const OTPModel = mongoose.model("opt", schema)
export default OTPModel