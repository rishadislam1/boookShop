import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-shop-server-39ktbk5uo-freelancerrishad.vercel.app/' }),
  tagTypes: ['comments','books','wishlist','finish'],
  endpoints: () => ({}),
});
