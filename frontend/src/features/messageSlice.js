import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import msgApi from "../services/msgApi";

const SOCKET_URL = "http://localhost:5000";

const endpoints = [msgApi.endpoints.profileUserRooms];

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    rooms: [],
    currentRoom: null,
    members: [],
    messages: [],
    privateMemberMsg: null,
    newMessages: {},
    error: null,
    socket: null,
  },
  reducers: {
    addMembers: (state, { payload }) => {
      state.members = payload;
    },
    setCurrentRoom: (state, { payload }) => {
      return { ...state, currentRoom: payload };
    },
    setMessages: (state, { payload }) => {
      return { ...state, messages: payload };
    },
    setPrivateMemberMsg: (state, { payload }) => {
      return { ...state, privateMemberMsg: payload };
    },
    setRooms: (state, { payload }) => {
      const roomsWithUser = payload?.rooms.filter((room) => {
        if (room.admin === payload.user) return true;
        else {
          return room.members.some((member) => member.user === payload?.user);
        }
      });
      return { ...state, rooms: roomsWithUser };
    },
    setSocket: (state, action) =>
    {
      return {
        ...state,
        socket:
          (state.socket === null && action.payload)
            ? io(SOCKET_URL, {
                query: {
                  _id: action?.payload,
                },
              })
            : state.socket,
      };
    },
    checkMessageOfRoom: (state) =>
    {
      const roomWithCurrMsg = state?.rooms.filter(room => room._id === state.currentRoom) 
      if(roomWithCurrMsg.length===0) return {...state,messages:[]}
    }
  },
  extraReducers: (builder) => {
    // your extra reducers go here

    builder.addMatcher(
      msgApi.endpoints.profileUserRooms.matchFulfilled,
      (state, { payload, dispatch }) => {
        return {
          ...state,
          rooms: payload,
        };
      }
    );
  },
});

export const {
  addMembers,
  setCurrentRoom,
  setMessages,
  setPrivateMemberMsg,
  setRooms,
  setSocket,
  checkMessageOfRoom,
} = messageSlice.actions;
export default messageSlice.reducer;
