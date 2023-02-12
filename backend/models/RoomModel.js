import mongoose from "mongoose";


const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can't be blank"],
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Admin can't be blank"],
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      adminAccess: {
        type: Boolean,
        default: false,
      },
      name:String
    },
  ],
});


const Room = mongoose.model.Room || mongoose.model("Room", RoomSchema)

export default Room