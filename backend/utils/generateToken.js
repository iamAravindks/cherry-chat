import jwt from "jsonwebtoken";
import config from "../config.js";
const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
export default generateToken;
