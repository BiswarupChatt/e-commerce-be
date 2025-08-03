import { Address } from "../models/address-model.js";

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      phone,
      pinCode,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      country,
      isActive = true,
    } = req.body;

    // Validate required fields
    if (!fullName || !phone || !pinCode || !addressLine1) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newAddress = new Address({
      userId,
      fullName,
      phone,
      pinCode,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      country,
      isActive,
    });

    const savedAddress = await newAddress.save();
    res.status(201).json({
      message: "Address created successfully.",
      address: savedAddress,
    });
  } catch (error) {
    console.error("Error creating address:", error);
    res
      .status(500)
      .json({ message: "Server error while creating address.", error: error });
  }
};

export const getAllAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresser = await Address.find({ userId })
      .populate("userId", "firstName lastName email phone")
      .exec();

    if (!addresser || addresser.length === 0) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user." });
    }

    res.status(200).json({ addresses: addresser });
  } catch (error) {}
};

export const editAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const {
      fullName,
      phone,
      pinCode,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      country,
      isActive,
    } = req.body;

    const updatedFields = {
      ...(fullName && { fullName }),
      ...(phone && { phone }),
      ...(pinCode && { pinCode }),
      ...(addressLine1 && { addressLine1 }),
      ...(addressLine2 && { addressLine2 }),
      ...(landmark && { landmark }),
      ...(city && { city }),
      ...(state && { state }),
      ...(country && { country }),
      ...(typeof isActive === "boolean" && { isActive }), 
    };

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { $set: updatedFields },
      { new: true }
    ).populate("userId", "firstName lastName email phone");

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found or not authorized." });
    }

    res.status(200).json({
      message: "Address updated successfully.",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Server error while updating address.", error });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found or not authorized." });
    }

    res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Server error while deleting address.", error });
  }
}