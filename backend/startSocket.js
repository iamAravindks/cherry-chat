import { Server } from "socket.io";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import Room from "./models/RoomModel.js";
import {
  getFormattedDate,
  getLastMessagesFromRoom,
  getRooms,
  getTime,
  sortRoomMessagesByDate,
} from "./utils/generateToken.js";
import Message from "./models/Message.js";
import User from "./models/userModel.js";
import mongoose from "mongoose";
import config from "./config.js";

export const startSocket = (server) => {
  const app = express();
  const io = new Server(server, {
    /* options */
    cors: config.CLIENT_CONNECTION
  });

  io.on("connection", (socket) => {
    // Get new new user
    socket.on("new-user", async () => {
      const members = await User.find().select("-password");
      io.emit("new-user", members);
    });

    //load all rooms
    socket.on("load-rooms", async (id) => {
      try {
        const rooms = await getRooms();
        socket.emit("rooms-loaded", rooms);
      } catch (error) {
        console.log(error);
      }
    });

    //create a new room

    socket.on("create-room", async (roomName, admin, members = []) => {
      const room = await Room.create({
        name: roomName,
        admin,
        members: members.map((member) => ({
          user: member._id,
          adminAccess: member.adminAccess || false,
        })),
      });

      const rooms = await getRooms();
      const adminUser = await User.findById(admin)
        .select("-password")
        .select("-newMessages");
      const message = `${
        adminUser.name
      } created this room on ${getFormattedDate()}`;

      const newMessage = await Message.create({
        content: message,
        from: adminUser,
        time: getTime(),
        date: getFormattedDate(),
        to: room._id,
        notification: true,
      });
      io.emit("rooms-loaded", rooms);

      // sending message to room
    });

    // adding members to room
    socket.on("add-room-members", async (roomId, members) => {
      try {
        const room = await Room.findById(roomId);

        if (!room) {
          return;
        }

        room.members = [
          ...room.members,
          ...members.map((member) => ({
            user: member._id,
            adminAccess: member.adminAccess || false,
          })),
        ];

        await room.save();
        socket.emit("room-members-added", room);
      } catch (error) {
        socket.emit("error", error.message);
      }
    });

    //   leave a room
    socket.on("leave-room", async (roomId, member) => {
      try {
        const room = await Room.findOne({
          admin: mongoose.Types.ObjectId(member),
        });
        if (room)
        {
          await Room.deleteOne({ _id: roomId });

          const rooms = await getRooms();
          io.emit("rooms-loaded", rooms);
        } else {
          const roomWithMember = await Room.find(
            {
              _id: roomId,
              "members.user": member,
            },
            {
              "members.$": 1,
            }
          );
          if (!roomWithMember) {
            throw new Error("Room or member not found");
          }
          const deletedMemberRoom = await Room.findOneAndUpdate(
            {
              _id: roomId,
            },
            {
              $pull: {
                members: {
                  user: mongoose.Types.ObjectId(member),
                },
              },
            }
          );

          const memberLeft = await User.findById(member).select("-password");
          const message = `${
            memberLeft.name
          } left this room on ${getFormattedDate()}`;

          const newMessage = await Message.create({
            content: message,
            from: memberLeft,
            time: getTime(),
            date: getFormattedDate(),
            to: roomId,
            notification: true,
          });

          let roomMessages = await getLastMessagesFromRoom(roomId);
          roomMessages = sortRoomMessagesByDate(roomMessages);


          // sending message to room

          io.broadcast.to(roomId).emit("room-messages", roomMessages);

          const rooms = await getRooms();
          socket.leave(roomId);
          io.emit("rooms-loaded", rooms);
        }
      } catch (error) {
        console.error(error);
        io.emit("error", error.message);
      }
    });

    // join chat
    socket.on("join-room", async (newRoom, previousRoom) => {
      socket.join(newRoom);
      socket.leave(previousRoom);

      let roomMessages = await getLastMessagesFromRoom(newRoom);
      roomMessages = sortRoomMessagesByDate(roomMessages);
      socket.emit("room-messages", roomMessages);
    });

    socket.on("message-room", async (room, content, sender, time, date) => {
      const newMessage = await Message.create({
        content,
        from: sender,
        time,
        date,
        to: room,
      });
      let roomMessages = await getLastMessagesFromRoom(room);
      roomMessages = sortRoomMessagesByDate(roomMessages);

      // sending message to room

      io.to(room).emit("room-messages", roomMessages);
      // io.emit("room-messages", roomMessages);

      socket.broadcast.emit("notification", room);
    });
    app.delete(
      "/api/users/logout",
      expressAsyncHandler(async (req, res) => {
        try {
          const { _id, newMessages } = req.body;
          const user = await User.findById(_id);
          user.status = "offline";
          user.newMessages = newMessages;
          await user.save();
          const members = await User.find().select("-password");
          socket.broadcast.emit("new-user", members);
          res.status(200);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
      })
    );
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });
};
