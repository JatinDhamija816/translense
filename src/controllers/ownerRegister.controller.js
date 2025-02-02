import Business from "../models/business.model.js";
import Owner from "../models/owner.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ownerRegister = asyncHandler(async (req, res) => {
  let {
    fullName,
    country,
    state,
    city,
    address,
    email,
    mobileNumber,
    businessId,
  } = req.body;
  const profilePic = req.file?.path;

  if (
    [
      fullName,
      country,
      state,
      city,
      address,
      email,
      mobileNumber,
      businessId,
    ].some((field) => typeof field !== "string" || !field.trim())
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

  const findBusiness = await Business.findById(businessId);
  if (!findBusiness) {
    throw new ApiError(400, "Business ID not found");
  }

  const existingEmail = await Owner.findOne({
    email: email.trim().toLowerCase(),
  });
  if (existingEmail) {
    throw new ApiError(409, "An owner with this email already exists");
  }

  const existingMobileNumber = await Owner.findOne({ mobileNumber });
  if (existingMobileNumber) {
    throw new ApiError(409, "An owner with this mobile number already exists");
  }

  const owner = await Owner.create({
    fullName,
    country,
    state,
    city,
    address,
    email: email.trim().toLowerCase(),
    mobileNumber,
    businessId,
    profilePic,
  });

  await Business.findByIdAndUpdate(businessId, {
    $push: { owners: owner._id },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, owner, "Owner registered successfully"));
});

export default ownerRegister;
