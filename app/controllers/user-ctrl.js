import { User } from "../models/user-model.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Server error" });
  }
};
