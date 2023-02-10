import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import Message from "./models/Message.js";
import User from "./models/userModel.js";
import morgan from "morgan";
import expressAsyncHandler from "express-async-handler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("dev"));

connectDB();
const PORT = 5000 || process.env.PORT;

const server = http.createServer(app);
const io = new Server(server, {
  /* options */
  cors: "http://localhost:3000",
});

app.use("/api/users", userRouter);

const getLastMessagesFromRoom = async (room) => {
  const roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messageByDate: { $push: "$$ROOT" } } },
  ]);

  return roomMessages;
};

const sortRoomMessagesByDate = (messages) =>
  messages.sort((a, b) => {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[1] + date1[0];
    date2 = date2[2] + date2[1] + date2[0];
    return date1 < date2 ? -1 : 1;
  });

// socket connection

io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find().select("-password");
    io.emit("new-user", members);
  });

  socket.on("check", async () => {
    console.log("hello");
  });

  socket.on("join-room", async (newRoom, previousRoom) =>
  {
    socket.join(newRoom);
    socket.leave(previousRoom)
    
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    console.log(content);
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

    console.log(roomMessages);

    io.to(room).emit('room-messages', roomMessages)
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
        res.status(200)
      } catch (error) {
        res.status(400)
        throw new Error(error.message);
      }
    })
  );
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

app.use(errorHandler);
server.listen(PORT, () => console.log(`server listen at ${PORT}`));
