import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
const userRouter = express.Router();

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "No such user exist" });
    }
    if (user && (await user.matchPassword(password))) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(user._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json(user.toJSON());
    } else {
      res.status(401).json({ message: "invalid password or email" });
    }
  })
);

// @desc get user profile
// @route GET /profile
// @access private

userRouter.get(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json(user.toJSON());
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc Register a new user
// @route POST /api/users
// @access Public

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    let newUser = { name, email, password };
    if (req.body.picture) {
      newUser = { ...newUser, picture: req.body.picture };
    }
    const user = await User.create(newUser);

    if (user) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(user._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json(user.toJSON());
    } else {
      res.status(400).json({ message: "Registration failed" });
    }
  })
);

// @desc Profile update
// @route PUT /api/profile
// @access private

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;

      const updatedUser = await user.save();

      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(updatedUser._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({ message: "user doesn't found" });
    }
  })
);

export default userRouter;
