import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

// persisting the store

import thunk from "redux-thunk";
import messageSlice from "./features/messageSlice";
import msgApi from "./services/msgApi";




// reducers
const reducers = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
  message: messageSlice,
  [msgApi.reducerPath]:msgApi.reducer
});






// persist our store


const store = configureStore({
  reducer: reducers,
  middleware: [thunk, appApi.middleware, msgApi.middleware],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
