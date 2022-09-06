import React from "react";
import { useSelector } from "react-redux";
import { GiOpenBook } from "react-icons/gi";
import clsx from "clsx";

import styles from "./Home.module.scss";

import { Search, BookContainer } from "@/components";

export const Home = () => {
  const { query } = useSelector((state) => state.book);

  const extraStyles = {
    [styles.direction]: query !== "",
  };

  return (
    <div className={clsx(styles.base, extraStyles)}>
      <div className="w-full">
        <div className={styles.logo}>
          <GiOpenBook className="dark:text-slate-800" />
        </div>
        <div className="w-full">
          <Search />
        </div>
      </div>
      <div className="mt-10 w-full">
        <BookContainer />
      </div>
    </div>
  );
};
