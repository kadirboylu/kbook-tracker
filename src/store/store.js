import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./bookSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    auth: authReducer,
  },
});
