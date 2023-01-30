import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

// persisting the store

import {  persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";



// reducers
const reducers = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});



const persistConfig = {
  key: "x-root-chatAPP",
  storage,
  whitelist: ["user"],
  // stateReconciler: (inboundState, originalState) => {
  //   return { user: { _id: inboundState.user._id || null} };
  // },
};


// persist our store

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});

export default store;
