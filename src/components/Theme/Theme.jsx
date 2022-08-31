import { useEffect } from "react";
import clsx from "clsx";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import styles from "./Theme.module.scss";

import { useDarkMode } from "@/hook/useDarkMode";

export const Theme = () => {
  const [theme, setTheme] = useDarkMode();

  const handleThemeChange = () => {
    setTheme(() => (theme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={handleThemeChange} className={styles.base}>
      <MdDarkMode
        className={clsx(styles.theme, styles["theme-dark"], "dark:inline-flex")}
      />
      <MdLightMode
        className={clsx(styles.theme, styles["theme-light"], "dark:hidden")}
      />
    </button>
  );
};
