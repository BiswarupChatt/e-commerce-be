// prettier-ignore
import express from "express";

//controllers
import { getAllUsers, editUser, getUserById, getMyProfile } from "./app/controllers/user-ctrl.js";
import { sendOtp, verifyLoginOtp, verifySignupOtp } from "./app/controllers/otp-ctrl.js";

//validations
import { sendOtpValidation, verifyLoginOtpValidation, verifySignupOtpValidation } from "./app/validations/otp-validation.js";
import { editUserValidation } from "./app/validations/user-validation.js";

//middlewares
import { validate } from "./app/middlewares/validate.js";
import { authenticateUser } from "./app/middlewares/authenticateUser.js";
import { AuthorizeUser } from "./app/middlewares/authorizeUser.js";

export const routes = express.Router();

// **** otp route ****
routes.post("/otp/send-otp", sendOtpValidation, validate, sendOtp);
routes.post("/otp/verify-signup-otp", verifySignupOtpValidation, validate, verifySignupOtp);
routes.post("/otp/verify-login-otp", verifyLoginOtpValidation, validate, verifyLoginOtp);

// **** user route ****
routes.get("/user/me", authenticateUser, AuthorizeUser("user", "admin"), getMyProfile);
routes.get("/user/get/:id", authenticateUser, AuthorizeUser("admin"), getUserById);
routes.get("/user/get-all", authenticateUser, AuthorizeUser("admin"), getAllUsers);
routes.post("/user/edit", editUserValidation, authenticateUser, AuthorizeUser("user", "admin"), editUser); // Allow user and admin to edit their own profile
routes.post("/user/edit/:id", editUserValidation, authenticateUser, AuthorizeUser("admin"), editUser); // Allow admin to edit any user by passing userId as param
