import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("userCredentials", UserSchema);

export default User;
