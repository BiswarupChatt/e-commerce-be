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

export const editUser = async (req, res) => {
  try {
    const userId = req.userId;
    const requestingUser = req.user; // should contain role info like { id, role: "user" }

    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      avatar,
      defaultAddress,
      isActive,
      role,
    } = req.body;

    const updatedFields = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(gender && { gender }),
      ...(dateOfBirth && { dateOfBirth }),
      ...(avatar && { avatar }),
      ...(defaultAddress && { defaultAddress }),
      ...(typeof isActive === "boolean" && { isActive }),
    };

    if (role && requestingUser.role === "admin") {
      updatedFields.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Edit user error:", err);
    return res.status(500).json({ message: "Internal server error." });
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
