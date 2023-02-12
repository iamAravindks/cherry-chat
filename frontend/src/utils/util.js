import axios from "axios";
import { setError, setLoading } from "../features/userSlice";
export const uploadImg = async (filename) => {
  const formData = new FormData();
  formData.append("file", filename);
  formData.append("upload_preset", "atyrg7be");
  console.log(filename);
  const res = await axios.post(
    ` https://api.cloudinary.com/v1_1/dlgosw3g3/image/upload`,
    formData
  );
  return res.data.url;
};

export const handleFunction = async (dispatch, main, args = []) => {
  dispatch(setLoading(true));
  const res = await main(...args);
  if (res.error) dispatch(setError(res.error.data.message));
  dispatch(setLoading(false));
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

export const getUser = (user) => {
  const formatUser = { ...user };
  const keysToDel = ["loading", "error"];
  keysToDel.forEach((key) => delete formatUser[key]);
  return formatUser;
};

export const generateOrderId = (id1, id2) =>
  id1 > id2 ? `${id1}-${id2}` : `${id2}-${id1}`;

export const checkRoomAdmin = (rooms, roomId, userId) => {
  const roomWithAdmin = rooms.filter(
    (room) => room._id === roomId && room.admin === userId
  );
  return roomWithAdmin.length > 0;
};

export const getMembers = (rooms, currentRoom) =>
{
  const mems = rooms.find(room => room._id === currentRoom)
  return mems
}


