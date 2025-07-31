import express from "express";
import { userCtrl } from "./app/controllers/user-ctrl.js";
import {
  sendOtp,
  verifyLoginOtp,
  verifySignupOtp,
} from "./app/controllers/otp-ctrl.js";
import {
  sendOtpValidation,
  verifyLoginOtpValidation,
  verifySignupOtpValidation,
} from "./app/validations/otp-validation.js";
import { validate } from "./app/middlewares/validate.js";

export const routes = express.Router();

// ** user route **
routes.get("/login", userCtrl.get);

// ** otp route **
routes.post("/send-otp", sendOtpValidation, validate, sendOtp);
routes.post(
  "/verify-signup-otp",
  verifySignupOtpValidation,
  validate,
  verifySignupOtp
);
routes.post(
  "/verify-login-otp",
  verifyLoginOtpValidation,
  validate,
  verifyLoginOtp
);
