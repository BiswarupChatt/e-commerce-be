export const AuthorizeUser = (...allowedRoles) => {
  return (req, res, next) => {
    const { role, isActive } = req.user;

    console.log(req.user)

    if (!role) {
      return res.status(401).json({ message: "User role not found in token." });
    }
    if (!isActive) {
      return res
        .status(403)
        .json({ message: "Account is inactive. Access denied." });
    }
    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this route." });
    }

    next();
  };
};

export const requireVerified = (req, res, next) => {
  if (!req.isVerified) {
    return res
      .status(403)
      .json({ message: "Email not verified. Access denied." });
  }
  next();
};
