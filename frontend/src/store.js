import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

// persisting the store

import thunk from "redux-thunk";




// reducers
const reducers = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});






// persist our store


const store = configureStore({
  reducer: reducers,
  middleware: [thunk, appApi.middleware],
});

export default store;
