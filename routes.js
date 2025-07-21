import express from "express";
import { userCtrl } from "./app/controllers/user-ctrl.js";
import { sendOtp, verifyOtp } from "./app/controllers/otp-ctrl.js";

export const routes = express.Router();

// ** user route **
routes.get("/login", userCtrl.get);

// ** otp route **
routes.post("/send-otp", sendOtp);
routes.post("/verify-otp", verifyOtp);
