// prettier-ignore
import express from "express";

//controllers
import { sendOtp, verifyLoginOtp, verifySignupOtp } from "./app/controllers/otp-ctrl.js";
import { getAllUsers, editUser, getUserById, getMyProfile } from "./app/controllers/user-ctrl.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "./app/controllers/category-ctrl.js";

//validations
import { sendOtpValidation, verifyLoginOtpValidation, verifySignupOtpValidation } from "./app/validations/otp-validation.js";
import { editUserValidation } from "./app/validations/user-validation.js";
import { createAddressValidation, editAddressValidation } from "./app/validations/address-validation.js";
import { createCategoryValidation, updateCategoryValidation } from "./app/validations/category-validation.js";

//middlewares
import { validate } from "./app/middlewares/validate.js";
import { authenticateUser } from "./app/middlewares/authenticateUser.js";
import { AuthorizeUser } from "./app/middlewares/authorizeUser.js";
import { createAddress, deleteAddress, editAddress, getAllAddress } from "./app/controllers/address-ctrl.js";

export const routes = express.Router();

// **** otp route ****
routes.post("/otp/send-otp", sendOtpValidation, validate, sendOtp);
routes.post("/otp/verify-signup-otp", verifySignupOtpValidation, validate, verifySignupOtp);
routes.post("/otp/verify-login-otp", verifyLoginOtpValidation, validate, verifyLoginOtp);

// **** user route ****
routes.get("/user/me", authenticateUser, AuthorizeUser("user", "admin"), getMyProfile);
routes.get("/user/get/:id", authenticateUser, AuthorizeUser("admin"), getUserById);
routes.get("/user/get-all", authenticateUser, AuthorizeUser("admin"), getAllUsers);
routes.put("/user/edit", editUserValidation, validate, authenticateUser, AuthorizeUser("user", "admin"), editUser); // Allow user and admin to edit their own profile
routes.put("/user/edit/:id", editUserValidation, validate, authenticateUser, AuthorizeUser("admin"), editUser); // Allow admin to edit any user by passing userId as param

// **** address route ****
routes.post("/address/create", createAddressValidation, validate, authenticateUser, AuthorizeUser("user", "admin"), createAddress);
routes.get("/address/get-all", authenticateUser, AuthorizeUser("user", "admin"), getAllAddress);
routes.put("/address/edit/:id", editAddressValidation, validate, authenticateUser, AuthorizeUser("user", "admin"), editAddress);
routes.delete("/address/delete/:id", authenticateUser, AuthorizeUser("user", "admin"), deleteAddress);

// **** category route ****
routes.post("/category/create", createCategoryValidation, validate, authenticateUser, AuthorizeUser("admin"), createCategory);
routes.get("/category/get-all", authenticateUser, AuthorizeUser("admin"), getAllCategories);
routes.get("/category/get/:id", authenticateUser, AuthorizeUser("admin"), getCategoryById);
routes.put("/category/update/:id", updateCategoryValidation, validate, authenticateUser, AuthorizeUser("admin"), updateCategory);
routes.delete("/category/delete/:id", authenticateUser, AuthorizeUser("admin"), deleteCategory);

