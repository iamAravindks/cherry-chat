import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/userModel.js";

export const isAuth = expressAsyncHandler(async (req, res, next) => {
  
  const token = req.cookies[config.AUTH_COOKIE];
  if (token) {
    try {
      const decodedObj = jwt.verify(
        token,
        config.JWT_SECRET,
        function (err, decoded) {
          if (err) {
            res.status(401);
            next(new Error("Session expired! try to login again"));
          } else {
            return decoded;
          }
        }
      );
      const user = await User.findById(decodedObj.id);
      if (user) {
        req.user = await User.findById(decodedObj.id).select("-password");
        next();
      } else {
        res.status(404);
        next(new Error("No user found"));
      }
    } catch (error) {
      res.status(401);
      throw new Error("Session expired! try to login again");
    }
  } else {
    res.status(401).json({ message: "Invalid login credentials! Try to login again" });
  }
});
