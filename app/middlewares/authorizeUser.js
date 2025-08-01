export const AuthorizeUser = (...allowedRoles) => {
  return (req, res, next) => {
    const { role, isActive } = req;

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
