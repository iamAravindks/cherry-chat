import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import msgApi from "../services/msgApi";

const SOCKET_URL = "localhost:5000";

export const socket = io(SOCKET_URL);

const endpoints = [msgApi.endpoints.profileUserRooms];

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    rooms: [],
    currentRoom: null,
    members: [],
    messages: [],
    privateMemberMsg: {},
    newMessages: {},
    error: null,
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
        if (room.admin === payload?.user) return true;
        else {
          return room.members.some((member) => member.user === payload?.user);
        }
      });
      return { ...state, rooms: roomsWithUser };
    },

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
  
} = messageSlice.actions;
export default messageSlice.reducer;
