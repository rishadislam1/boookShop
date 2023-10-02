import { configureStore } from '@reduxjs/toolkit'
import userReducer from './feature/user/userSlice'
import { api } from './api/apiSlice'
import bookReducer from './feature/books/bookSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch