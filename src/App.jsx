import { DefaultLayout } from "@/components";
import { Route, Routes } from "react-router-dom";
import { Home, MyBooks, Login, Signup } from "@/routes";
import { useCloseDropdown } from "@/hook/useCloseDropdown";

function App() {
  useCloseDropdown();

  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
