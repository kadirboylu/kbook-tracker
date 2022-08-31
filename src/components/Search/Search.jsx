import React from "react";
import clsx from "clsx";
import { FaSearch } from "react-icons/fa";

import styles from "./Search.module.scss";

export const Search = () => {
  const extraStyles = {
    dark: "dark:bg-slate-700 dark:text-white",
  };

  return (
    <div className={styles.base}>
      <input type="text" placeholder="Search" className={extraStyles.dark} />
      <div className={clsx(styles.icon, extraStyles.dark)}>{<FaSearch />}</div>
    </div>
  );
};
