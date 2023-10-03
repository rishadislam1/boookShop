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
    updateBooks: builder.mutation({
      query:({id,book})=>({

        url: `/updateBooks/${id}`,
        method: 'PATCH',
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
    deleteBook: builder.mutation({
      query: (id)=>({
        url: `/book/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
    addWishList: builder.mutation({
      query:(book)=>({
     
        url: `/addWishlist`,
        method: 'POST',
        body: book
      }),
      invalidatesTags: ['wishlist'],
    }),
    getWishlist: builder.query({
      query: () => '/wishlist',
    }),
    deletewishlist: builder.mutation({
      query: (id)=>({
        url: `/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['wishlist'],
    }),
    addFinish: builder.mutation({
      query:(book)=>({
     
        url: `/addFinish`,
        method: 'POST',
        body: book
      }),
      invalidatesTags: ['finish'],
    }),
    getFinish: builder.query({
      query: () => '/finish',
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetBooksQuery,
  useAddBooksMutation,
  usePostCommentMutation,
  useSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBooksMutation,
  useAddWishListMutation,
  useGetWishlistQuery,
  useDeletewishlistMutation,
  useAddFinishMutation,
  useGetFinishQuery
} = productApi;
