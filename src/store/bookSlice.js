import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchBooks } from "@/utils/search";

const initialState = {
  books: [],
  query: "",
  index: 0,
  dropdown: false,
  isLoading: false,
  hasMore: true,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (obj, thunkAPI) => {
    const { q, index } = obj;
    try {
      const response = await searchBooks(q, index);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    toggleDropdown: (state) => {
      state.dropdown = !state.dropdown;
    },
    closeDropdown: (state) => {
      state.dropdown = false;
    },
    loadMore: (state) => {
      state.index += 30;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    reset: (state) => {
      state.books = [];
      state.index = 0;
      state.query = "";
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      !action.payload?.items ? (state.hasMore = false) : (state.hasMore = true);

      state.hasMore &&
        (state.books = [...state.books, ...action.payload.items]);
    },
    [fetchBooks.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { toggleDropdown, closeDropdown, setQuery, reset, loadMore } =
  bookSlice.actions;

export default bookSlice.reducer;
