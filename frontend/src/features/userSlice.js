import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

const endpoints = [
  appApi.endpoints.signUpUser,
  appApi.endpoints.loginUser,
  appApi.endpoints.profileUser,
  appApi.endpoints.logout,
];

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    _id: null,
  },
  reducers: {
    addNotifications: (state, { payload }) => {
      if (state.newMessages[payload]) state.newMessages[payload] += 1;
      else state.newMessages[payload] = 1;
    },
    resetNotifications: (state, { payload }) =>
    {
      delete state.newMessages[payload]
    },
    clearError: (state) => {
      state.error = null;
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    loadID: (state) => {
      state._id =
        JSON.parse(localStorage.getItem("cherry-chat-status")) || null;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signUpUser.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("cherry-chat-status", JSON.stringify(payload._id));

        return { ...state, loading: false, error: null, ...payload };
      }
    );

    builder.addMatcher(
      appApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("cherry-chat-status", JSON.stringify(payload._id));
        return { ...state, loading: false, error: null, ...payload };
      }
    );
    builder.addMatcher(
      appApi.endpoints.profileUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, loading: false, error: null, ...payload };
      }
    );

    builder.addMatcher(
      appApi.endpoints.profileUser.matchFulfilled,
      (state, { payload }) => {
        return { ...state, loading: false, error: null, ...payload };
      }
    );
    builder.addMatcher(appApi.endpoints.logout.matchFulfilled, () => {
      localStorage.removeItem("cherry-chat-status");

      return { loading: false, error: null };
    });

    endpoints.forEach(({ matchPending, matchRejected }) => {
      builder.addMatcher(matchPending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addMatcher(matchRejected, (state, { payload: error }) => {
        state.error = error?.data?.message;
        state.loading = false;
      });
    });
  },
});

export const {
  addNotifications,
  resetNotifications,
  clearError,
  loadID,
  setError,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
