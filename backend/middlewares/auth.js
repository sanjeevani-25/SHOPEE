const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("Login First to access this resource.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

// handling user roles
exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    const userRole = req.user ? req.user.role : null;
    // console.log(roles);
    // console.log(userRole);

    if (!userRole || !roles.includes(userRole)) {
      return next(
        new ErrorHandler(
          `Role (${userRole}) is not allowed to access this resource`,
          403
        )
      );
    }

    // If the user role is allowed, continue to the next middleware or route handler
    next();
  };
};
