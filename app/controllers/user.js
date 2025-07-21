export const userCtrl = {};
import { User } from "../models/user-model.js";

userCtrl.get = async (req, res) => {
  try {
    return res.json({
      msg: "balle balle",
    });
  } catch (error) {
    res.status(400).json({
      msg: "error",
    });
  }
};
