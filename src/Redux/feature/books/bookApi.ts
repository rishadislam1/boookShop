import { api } from "../../api/apiSlice";


const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
    }),
    addBooks: builder.mutation({
      query:(book)=>({
     
        url: `/addbook`,
        method: 'POST',
        body: book
      }),
      invalidatesTags: ['books'],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  useAddBooksMutation,
  usePostCommentMutation,
  useSingleBookQuery,
} = productApi;
