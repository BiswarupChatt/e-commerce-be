import { body } from "express-validator";
import mongoose from "mongoose";

export const editUserValidation = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string."),

  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string."),

  body("email").optional().isEmail().withMessage("Invalid email address."),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number."),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be 'male', 'female' or 'other'."),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date."),

  body("avatar").optional().isURL().withMessage("Avatar must be a valid URL."),

  body("defaultAddress")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid default address ID."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'."),
];
