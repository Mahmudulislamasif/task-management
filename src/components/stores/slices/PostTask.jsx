// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const postTask = createApi({
  reducerPath: 'posttask',
  baseQuery: () => fetchBaseQuery({ baseUrl: "https://662b3e2ade35f91de1579b1e.mockapi.io/task/get"}), // Use local JSON data directly
  endpoints: (builder) => ({

    getAllTask: builder.query({
      query: () => Tasklist, // Return local JSON data
    }),
    creatTask:builder.mutation({
      query: (data) => ({
        method:"POST",
        body:data
      })
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTaskQuery, useCreatTaskMutation } = postTask;