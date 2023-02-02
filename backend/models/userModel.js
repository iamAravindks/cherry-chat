import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name can't be blank"] },
    email: {
      type: String,
      required: [true, "Email can't be blank"],
      index: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    password: { type: String, required: true },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dlgosw3g3/image/upload/v1675270823/default_ilxi6n.png",
    },
    newMessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "online",
    },
  },
  { minimize: false, versionKey: "__v" }
);


UserSchema.methods.toJSON = function ()
{
  const user = this;
  const userObject = user.toObject();
  delete userObject.password
  return userObject
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.pre("save", async function (next) {
  // if not password modified (if an existed user updates the email and name)
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
