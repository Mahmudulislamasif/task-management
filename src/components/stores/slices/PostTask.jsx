// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const postTask = createApi({
  reducerPath: 'postTask',
  baseQuery:  fetchBaseQuery({ baseUrl: 'https://662cc3730547cdcde9df14e0.mockapi.io/' }), // Use local JSON data directly
  endpoints: (builder) => ({
  
    getAllTask: builder.query({
       query: () => 'crud'
    }),
    creatTask:builder.mutation({
      query: (data) => ({
          url: 'crud', // Endpoint for creating a new task
        method: 'POST',
        body: data,
      })
    }),
   updateTask:builder.mutation({
      query: ({id, ...rest}) => ({
          url: `crud/${id}`, // Endpoint for creating a new task
        method: 'PUT',
        body: rest,
      })
   }),
     deleteTask:builder.mutation({
      query: (id) => ({
          url: `crud/${id}`, // Endpoint for creating a new task
        method: 'DELETE',
      })
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTaskQuery, useCreatTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = postTask;