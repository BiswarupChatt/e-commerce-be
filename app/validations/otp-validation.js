// validations/otpValidation.js
import { check, body } from "express-validator";

export const sendOtpValidation = [
  
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),

  body("email").optional().isEmail().withMessage("Invalid email address"),

  body().custom((value) => {
    if (!value.phone && !value.email) {
      throw new Error("Either phone or email is required");
    }
    return true;
  }),
];

export const verifyOtpValidation = [
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numeric"),

  body("purpose")
    .notEmpty()
    .withMessage("Purpose is required")
    .isIn(["login", "registration"])
    .withMessage("Purpose must be login or registration"),

  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),

  body("email").optional().isEmail().withMessage("Invalid email address"),

  // Custom validator: ensure either phone or email is present
  body().custom((value) => {
    if (!value.phone && !value.email) {
      throw new Error("Either phone or email is required");
    }
    return true;
  }),

  // Custom validator: if purpose is registration, firstName and lastName are required
  body().custom((value) => {
    if (value.purpose === "registration") {
      if (!value.firstName || !value.lastName) {
        throw new Error(
          "First name and last name are required for registration"
        );
      }
    }
    return true;
  }),
];
