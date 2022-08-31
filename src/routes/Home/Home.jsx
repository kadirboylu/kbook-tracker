import React from "react";
import { GiOpenBook } from "react-icons/gi";

import styles from "./Home.module.scss";

import { Search } from "@/components";

export const Home = () => {
  return (
    <div className={styles.base}>
      <div className={styles.logo}>
        <GiOpenBook className="dark:text-slate-800" />
      </div>
      <div className="w-full">
        <Search />
      </div>
    </div>
  );
};
