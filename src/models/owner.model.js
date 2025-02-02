import { Schema, model } from "mongoose";

const ownerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10,15}$/, "Please enter a valid mobile number"],
    },
    profilePic: {
      type: String,
      default: null,
    },
    businessId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true,
      },
    ],
    otp: {
      type: Number,
      min: 100000,
      max: 999999,
    },
    otpExpiry: {
      type: Date,
      default: () => Date.now() + 10 * 60 * 1000,
    },
  },
  { timestamps: true }
);

const Owner = model("Owner", ownerSchema);

export default Owner;
