import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//define a service using a base URL

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    //creating the user
    signUpUser: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    //   login a user

    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // get the profile

    profileUser: builder.mutation({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),

    // logout a user

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
      }),
    }),
  }),
});


export const { useLoginUserMutation, useSignUpUserMutation, useLogoutMutation ,useProfileUserMutation} = appApi
export default appApi