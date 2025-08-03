import { body } from "express-validator";

export const createAddressValidation = [
  body("fullName").notEmpty().withMessage("Full name is required."),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("pinCode").notEmpty().withMessage("Pin code is required."),

  body("addressLine1").notEmpty().withMessage("Address Line 1 is required."),

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

export const editAddressValidation = [
  body("fullName")
    .optional()
    .notEmpty()
    .withMessage("Full name cannot be empty."),

  body("phone")
    .optional()
    .notEmpty()
    .withMessage("Phone number cannot be empty.")
    .isMobilePhone()
    .withMessage("Invalid phone number."),

  body("pinCode")
    .optional()
    .notEmpty()
    .withMessage("Pin code cannot be empty."),

  body("addressLine1")
    .optional()
    .notEmpty()
    .withMessage("Address Line 1 cannot be empty."),

  body("addressLine2")
    .optional()
    .isString()
    .withMessage("Address Line 2 must be a string."),

  body("landmark")
    .optional()
    .isString()
    .withMessage("Landmark must be a string."),

  body("city").optional().isString().withMessage("City must be a string."),

  body("state").optional().isString().withMessage("State must be a string."),

  body("country")
    .optional()
    .isString()
    .withMessage("Country must be a string."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),
];
