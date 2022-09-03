import { DefaultLayout } from "@/components";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Home, MyBooks, Login, Signup, Profile } from "@/routes";
import { useCloseDropdown } from "@/hook/useCloseDropdown";

function App() {
  useCloseDropdown();

  return (
    <DefaultLayout>
      <Toaster
        toastOptions={{
          className: "dark:bg-slate-700 dark:text-white mt-[50px]",
          duration: 2000,
        }}
        position="top-right"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
