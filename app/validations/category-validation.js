// validators/categoryValidator.js
import { body } from "express-validator";

export const createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required.")
    .isString()
    .withMessage("Category name must be a string."),

  body("slug")
    .optional()
    .isSlug()
    .withMessage("Slug must be URL-friendly."),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),

  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("sortOrder")
    .optional()
    .isString()
    .withMessage("sortOrder must be a number."),
];

export const updateCategoryValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Category name must be a string."),

  body("slug")
    .optional()
    .isSlug()
    .withMessage("Slug must be URL-friendly."),

  body("description")
    .optional()
    .isString(),

  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL."),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean."),

  body("sortOrder")
    .optional()
    .isNumeric()
    .withMessage("sortOrder must be a number."),
];
