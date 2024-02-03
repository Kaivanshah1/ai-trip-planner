import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
