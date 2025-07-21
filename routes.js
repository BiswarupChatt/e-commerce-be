import express from "express";
import { userCtrl } from "./app/controllers/user.js";

export const routes = express.Router();

routes.get("/login", userCtrl.get);
