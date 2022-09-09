import { initializeApp } from "firebase/app";
import toast from "react-hot-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { store } from "@/store";

import {
  setBookList,
  setCollectionID,
  setHasCollection,
} from "@/store/firestoreSlice";

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
export const db = getFirestore(app);

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
  } catch (e) {
    toast.error(e.message);
  }
};

// Send email verification
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

// Change password
export const changePassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Password updated");
    return true;
  } catch (e) {
    if (e.code === "auth/requires-recent-login") {
      toast.error("Please login again to change your password.");
      return "re-auth";
    } else {
      toast.error(e.message);
    }

    return false;
  }
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent");
  } catch (e) {
    if (e.code === "auth/too-many-requests") {
      toast.error("Please wait before sending more requests.");
    } else if (e.code === "auth/user-not-found") {
      toast.error("User not found");
    }
  }
};

// Add book to firestore
export const addBooks = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "books"), data);
  } catch (e) {
    toast.error("a", e.message);
  }
};

// Update book in firestore
export const updateBooks = async (id, data) => {
  try {
    const docRef = doc(db, "books", id);
    await updateDoc(docRef, data);
  } catch (e) {
    toast.error(e.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    onSnapshot(
      query(collection(db, "books"), where("uid", "==", auth.currentUser.uid)),

      (books) => {
        // store data
        const payload = books.docs.map((book) => {
          store.dispatch(setCollectionID(book.id));
          return book.data();
        });
        // update state
        payload[0]?.books
          ? store.dispatch(setBookList(payload[0].books))
          : store.dispatch(setBookList([]));

        // check if user has collection
        payload.length === 0
          ? store.dispatch(setHasCollection(false))
          : store.dispatch(setHasCollection(true));
      }
    );
  }
});

export default app;
