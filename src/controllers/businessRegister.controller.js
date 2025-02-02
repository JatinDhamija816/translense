import Business from "../models/business.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const businessRegister = asyncHandler(async (req, res) => {
  let {
    businessName,
    country,
    state,
    city,
    address,
    openingTime,
    closingTime,
    email,
    mobileNumber,
  } = req.body;

  const restaurantImage = req.file?.path;

  if (
    [
      businessName,
      country,
      state,
      city,
      address,
      openingTime,
      closingTime,
      email,
      mobileNumber,
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    throw new ApiError(400, "Invalid email format.");
  }

  mobileNumber = mobileNumber.replace(/\D/g, "");

  if (mobileNumber.startsWith("91") && mobileNumber.length === 12) {
    mobileNumber = mobileNumber.slice(2);
  }

  if (mobileNumber.length !== 10) {
    throw new ApiError(
      400,
      "Invalid mobile number. It should be 10 digits long."
    );
  }

  const existingBusiness = await Business.findOne({
    businessName: businessName.trim().toLowerCase(),
  });

  if (existingBusiness) {
    throw new ApiError(409, "Business with this name already exists");
  }

  const existingEmail = await Business.findOne({
    email: email.trim().toLowerCase(),
  });

  if (existingEmail) {
    throw new ApiError(409, "A business with this email already exists");
  }

  const existingMobileNumber = await Business.findOne({
    mobileNumber: mobileNumber,
  });

  if (existingMobileNumber) {
    throw new ApiError(
      409,
      "A business with this Mobile Number already exists"
    );
  }

  const business = await Business.create({
    businessName: businessName.trim(),
    country: country.trim(),
    state: state.trim(),
    city: city.trim(),
    address: address.trim(),
    openingTime,
    closingTime,
    email: email.trim(),
    mobileNumber,
    restaurantImage,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, business, "Business registered successfully"));
});

export default businessRegister;
