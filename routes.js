import express from "express";

//controllers
import { getUser, getAllUsers } from "./app/controllers/user-ctrl.js";
import {
  sendOtp,
  verifyLoginOtp,
  verifySignupOtp,
} from "./app/controllers/otp-ctrl.js";

//validations
import {
  sendOtpValidation,
  verifyLoginOtpValidation,
  verifySignupOtpValidation,
} from "./app/validations/otp-validation.js";

//middlewares
import { validate } from "./app/middlewares/validate.js";
import { authenticateUser } from "./app/middlewares/authenticateUser.js";
import { AuthorizeUser } from "./app/middlewares/authorizeUser.js";

export const routes = express.Router();

// ** user route **
routes.get(
  "/user/get",
  authenticateUser,
  AuthorizeUser("user", "admin"),
  getUser
);
routes.get(
  "/user/get-all",
  authenticateUser,
  AuthorizeUser("admin"),
  getAllUsers
);

// ** otp route **
routes.post("/otp/send-otp", sendOtpValidation, validate, sendOtp);
routes.post(
  "/otp/verify-signup-otp",
  verifySignupOtpValidation,
  validate,
  verifySignupOtp
);
routes.post(
  "/otp/verify-login-otp",
  verifyLoginOtpValidation,
  validate,
  verifyLoginOtp
);
