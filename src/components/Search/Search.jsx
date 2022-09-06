import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import debounce from "lodash.debounce";
import { FaSearch } from "react-icons/fa";
import { setQuery, reset } from "@/store/bookSlice";

import styles from "./Search.module.scss";

export const Search = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const extraStyles = {
    dark: "dark:bg-slate-700 dark:text-white",
  };

  useEffect(() => {
    dispatch(reset()); // reset the characters, queryResult and offset when the query changes
    dispatch(setQuery(text.replace(/\s/g, "+")));
  }, [text]);

  const updateQuery = (e) => setText(e.target.value); // update the query when the user types in the search bar

  const debouncedOnChange = debounce(updateQuery, 500); // debounce the search input to prevent unnecessary requests

  return (
    <div className={styles.base}>
      <input
        type="text"
        placeholder="Search"
        className={extraStyles.dark}
        onChange={debouncedOnChange}
      />
      <div className={clsx(styles.icon, extraStyles.dark)}>{<FaSearch />}</div>
    </div>
  );
};
