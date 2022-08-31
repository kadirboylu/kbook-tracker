import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(() => localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(theme === "light" ? "dark" : "light");
    root.classList.add(theme);
  }, [theme]);

  return [theme, setTheme];
};
