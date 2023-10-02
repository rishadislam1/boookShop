import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  publicationYear: number;
  searchItem: string | null;
}

const initialState: IBook = {
    publicationYear: 2023,
    searchItem: ''
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setPublicationYear: (state, action: PayloadAction<number>) => {
      state.publicationYear = action.payload;
    },
    setSearchItem: (state, action:PayloadAction<string>)=>{
      state.searchItem = action.payload
    }
  },
});

export const { setPublicationYear, setSearchItem } = bookSlice.actions;

export default bookSlice.reducer;
