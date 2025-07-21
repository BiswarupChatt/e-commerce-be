import jwt from "jsonwebtoken";

export const generateUserJwt = (user) => {
  const payload = {
    _id: user._id,
    phone: user.phone,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isVerified: user.isVerified,
    isActive: user.isActive,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
