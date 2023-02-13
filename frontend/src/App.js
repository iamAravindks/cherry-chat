/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import Chat from "./Components/Pages/Chat";
import { Home } from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import PrivateRouteWrapper from "./Components/PrivateRouteWrapper";
import { addMembers, checkMessageOfRoom, setMessages, setRooms, setSocket } from "./features/messageSlice";
import { addNotifications, loadID } from "./features/userSlice";
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
  const { socket, currentRoom } = useSelector((state) => state.message);
  const memoizedSocket = useMemo(() => socket, [socket]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadID());
    if (user._id) {
      profileUser().then((res) => {
        dispatch(setSocket(res.data._id));
      });
    }
  }, [user._id]);

useEffect(() => {
  dispatch(loadID());
  if (!user._id) return;

  profileUser().then((res) => {
    dispatch(setSocket(res.data._id));
    if (!memoizedSocket) return;

    memoizedSocket.emit("new-user");
    memoizedSocket.emit("load-rooms", user._id);


    memoizedSocket.off("new-user").on("new-user", (payload) => {
      dispatch(addMembers(payload));
    });

    memoizedSocket.off("rooms-loaded").on("rooms-loaded", async (data) => {
      const payload = { rooms: data, user: user._id };
      dispatch(setRooms(payload));
      dispatch(checkMessageOfRoom());
    });

    memoizedSocket
      .off("room-messages")
      .on("room-messages", async (roomMessages) => {
        if (roomMessages) dispatch(setMessages(roomMessages));
      });

    memoizedSocket.off("notification").on("notification", (room) => {
      if (room !== currentRoom) dispatch(addNotifications(room));
    });
  });
}, [user._id, memoizedSocket]);

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
      <Footer/>
    </div>
  );
};
export default App;
