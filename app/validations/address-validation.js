import { body } from "express-validator";

export const createAddressValidation = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required."),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("pinCode")
    .notEmpty()
    .withMessage("Pin code is required."),

  body("addressLine1")
    .notEmpty()
    .withMessage("Address Line 1 is required."),

  body("addressLine2").optional().isString(),
  body("landmark").optional().isString(),
  body("city").optional().isString(),
  body("state").optional().isString(),
  body("country").optional().isString(),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),
];
