/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import Chat from "./Components/Pages/Chat";
import { Home } from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import PrivateRouteWrapper from "./Components/PrivateRouteWrapper";
import { addMembers, checkMessageOfRoom, setMessages, setRooms, setSocket } from "./features/messageSlice";
import { loadID } from "./features/userSlice";
import { useProfileUserMutation } from "./services/appApi";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const App = (props) => {
  const [profileUser] = useProfileUserMutation();
  const user = useSelector((state) => state.user);
  const { socket ,currentRoom} = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadID());
    if (user._id) {
      profileUser().then((res) => {
        dispatch(setSocket(res.data._id));
      });
    }
  }, [user._id]);

  useEffect(() =>
  {
    if (socket) {
      socket.off("new-user").on("new-user", (payload) =>
      {
        
        dispatch(addMembers(payload));
      });

      socket.off("rooms-loaded").on("rooms-loaded", async (data) => {
        console.log("room",data);
        const payload = { rooms: data, user: user._id };
        dispatch(setRooms(payload));
        dispatch(checkMessageOfRoom())
      });
            socket
              .off("room-messages")
              .on("room-messages", async (roomMessages) => {
                console.log(roomMessages);
                if (roomMessages) dispatch(setMessages(roomMessages));
              });

      socket.emit("new-user")
    }
  }, [socket]);
  return (
    <div>
      <Loader />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRouteWrapper />}>
            <Route index element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
