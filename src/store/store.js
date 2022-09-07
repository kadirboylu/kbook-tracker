import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./bookSlice";
import authReducer from "./authSlice";
import firestoreReducer from "./firestoreSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    auth: authReducer,
    firestore: firestoreReducer,
  },
});
