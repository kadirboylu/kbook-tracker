import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";

import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up
export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

// Login
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error("Invalid email or password");
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

// Update user profile
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile updated successfully");
  } catch (e) {
    toast.error(e.message);
  }
};

export const sendVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success("Verification email sent");
    return true;
  } catch (e) {
    toast.error("Please wait before sending more requests.");
    return false;
  }
};

export const changePassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Password updated");
    return true;
  } catch (e) {
    toast.error(e.message);
    return false;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent");
  } catch (e) {
    console.log(e.code);
    if (e.code === "auth/too-many-requests") {
      toast.error("Please wait before sending more requests.");
    } else if (e.code === "auth/user-not-found") {
      toast.error("User not found");
    }
  }
};

export default app;
