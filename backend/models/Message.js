import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  content: String,
  from: Object,
  socketId: String,
  time: String,
  date: String,
  to: String,
  notification: { type: Boolean, default: false },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
