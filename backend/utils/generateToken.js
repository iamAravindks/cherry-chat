import jwt from "jsonwebtoken";
import config from "../config.js";
import Message from "../models/Message.js";
import Room from "../models/RoomModel.js";
const maxAge = 3 * 24 * 60 * 60;
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
export default generateToken;

export const getLastMessagesFromRoom = async (room) => {
  const roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messageByDate: { $push: "$$ROOT" } } },
  ]);

  return roomMessages;
};

export const sortRoomMessagesByDate = (messages) =>
  messages.sort((a, b) => {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[1] + date1[0];
    date2 = date2[2] + date2[1] + date2[0];
    return date1 < date2 ? -1 : 1;
  });

//get all the rooms by a user

export const getRooms = async (id = null) => {
  if (id == null) {
    const rooms = await Room.find();
    return rooms;
  }
  const rooms = await Room.find({
    $or: [{ admin: id }, { members: { $elemMatch: { user: id } } }],
  });
  return rooms;
};

export const getFormattedDate = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();
  let day = date.getDate().toString();
  month = month.length > 1 ? month : "0" + month;
  day = day.length > 1 ? day : "0" + day;
  return `${month}/${day}/${year}`;
};

export const getTime = () => {
  const date = new Date();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return date.getHours() + ":" + minutes;
};
