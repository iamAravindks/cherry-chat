import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//define a service using a base URL

const msgApi = createApi({
  reducerPath: "msgApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({


    // get the profile

    profileUserRooms: builder.mutation({
      query: () => ({
        url: "/users/rooms",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetRoomsMutation ,useProfileUserRoomsMutation} = msgApi;
export default msgApi;
