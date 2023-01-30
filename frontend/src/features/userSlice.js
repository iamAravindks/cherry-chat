import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotifications: (state, { payload }) => {},
    resetNotifications: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    //   save the user after signup

    builder.addMatcher(
      appApi.endpoints.signUpUser.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.profileUser.matchFulfilled,
      (state, { payload }) => payload
    );
    builder.addMatcher(appApi.endpoints.logout.matchFulfilled, () => null);
  },
});
export const { addNotifications, resetNotifications } = userSlice.actions;

export default userSlice.reducer;
