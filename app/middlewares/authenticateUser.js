import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token missing." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded._id,
      role: decoded.role,
      isVerified: decoded.isVerified,
      isActive: decoded.isActive,
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
