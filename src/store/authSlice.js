import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandle: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logoutHandle: (state) => {
      localStorage.removeItem("user");
      state.user = false;
    },
    updateProfile: (state, action) => {
      const { displayName, photoURL } = action.payload;
      state.user.displayName = displayName;
      state.user.photoURL = photoURL;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { loginHandle, logoutHandle, updateProfile } = authSlice.actions;

export default authSlice.reducer;
