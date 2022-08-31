import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: {},
  dropdown: false,
};

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
  },
});

export const { toggleDropdown, closeDropdown } = bookSlice.actions;

export default bookSlice.reducer;
