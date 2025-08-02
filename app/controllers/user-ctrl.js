import { User } from "../models/user-model.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

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
    const {
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      $or: [
        { firstName: { $regex: `^${search}`, $options: "i" } },
        { lastName: { $regex: `^${search}`, $options: "i" } },
        { email: { $regex: `^${search}`, $options: "i" } },
        { phone: { $regex: `^${search}`, $options: "i" } },
      ],
    };

    const sortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password"); // Hide password if it's in schema

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("getUserById error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const editUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id || req.user.id;

    const isAdmin = req.user.role === "admin";
    const isSelf = req.user.id === userIdToUpdate;

    if (!isAdmin && !isSelf) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this profile." });
    }

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
    };

    // Admin can update 'isActive' and 'role'
    if (isAdmin) {
      if (typeof isActive === "boolean") updatedFields.isActive = isActive;
      if (role) updatedFields.role = role;
    }

    // TODO: implementation of aws for image upload

    const updatedUser = await User.findByIdAndUpdate(
      userIdToUpdate,
      updatedFields,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

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
