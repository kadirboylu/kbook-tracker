import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  hasCollection: false,
  collectionId: "",
};

export const firestoreSlice = createSlice({
  name: "firestore",
  initialState,
  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
    appendBookList: (state, action) => {
      state.bookList = [...state.bookList, action.payload];
    },
    setHasCollection: (state, action) => {
      state.hasCollection = action.payload;
    },
    setCollectionID: (state, action) => {
      state.collectionId = action.payload;
    },
  },
});

export const {
  setBookList,
  appendBookList,
  setHasCollection,
  setCollectionID,
} = firestoreSlice.actions;

export default firestoreSlice.reducer;
