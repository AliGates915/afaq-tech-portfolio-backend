import mongoose  from "mongoose";

const contactScehmema= new mongoose.Schema( {
    interest: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true ,required: true},
    message: { type: String, trim: true },
  },
  { timestamps: true })

  export default mongoose.model("Contact",contactScehmema)