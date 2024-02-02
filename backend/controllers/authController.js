const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// register a user /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/jeez",
      url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  });
  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});

// login user /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //   check if email and password is entered
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //   find user in db
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  //   check if password is correct
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password", 401));
  }
  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});
