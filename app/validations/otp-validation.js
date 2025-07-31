// validations/otpValidation.js
import { body } from "express-validator";

// Shared validation: phone/email required
const contactValidation = [
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body().custom((value) => {
    if (!value.phone && !value.email) {
      throw new Error("Either phone or email is required");
    }
    return true;
  }),
];

// Validation for sending OTP (either phone or email)
export const sendOtpValidation = [...contactValidation];

// Validation for verifying signup OTP
export const verifySignupOtpValidation = [
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numeric"),

  ...contactValidation,

  body("firstName")
    .notEmpty()
    .withMessage("First name is required for registration"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required for registration"),
];

// Validation for verifying login OTP
export const verifyLoginOtpValidation = [
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .isNumeric()
    .withMessage("OTP must be numeric"),

  ...contactValidation,
];
