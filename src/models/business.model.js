import { Schema, model } from "mongoose";

const businessSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
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
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
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
    restaurantImage: {
      type: String,
      default: null,
    },
    owners: [
      {
        type: Schema.Types.ObjectId,
        ref: "Owner",
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

const Business = model("Business", businessSchema);

export default Business;
