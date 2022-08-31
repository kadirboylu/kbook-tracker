import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import styles from "./Header.module.scss";

import { logo } from "@/assets/svg";
import HeaderMenu from "./HeaderMenu";
import { Button, Theme } from "@/components";
import { toggleDropdown } from "@/store/bookSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const { dropdown } = useSelector((store) => store.book);

  const extraStyles = {
    header: "dark:bg-slate-800 dark:text-white",
    menu: "md:dark:bg-transparent dark:bg-slate-700",
    dropdown: dropdown ? "left-[0] top-[84px]" : "left-[-900px]",
  };

  return (
    <header className={clsx(extraStyles.header)}>
      <div className="flex items-center">
        {/* DROPDOWN */}
        <button
          onClick={() => dispatch(toggleDropdown())}
          className={styles["menu-btn"]}
        >
          {dropdown ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        {/* LOGO */}
        <div className={styles.logo}>
          <Link to="/">{logo}</Link>
        </div>
      </div>
      <div
        id="dropdown"
        className={clsx(styles.menu, extraStyles.dropdown, extraStyles.menu)}
      >
        <HeaderMenu />
        <div className={styles.buttons}>
          {/* THEME SWITCHER */}
          <div className={styles.theme}>
            <Theme />
          </div>
          {/* AUTH BUTTONS */}
          <Link className={styles.link} to="/login">
            <Button text={"LOGIN"} theme={"primary"} />
          </Link>
          <Link className={styles.link} to="/signup">
            <Button text={"SIGN UP"} theme={"primary"} />
          </Link>
        </div>
      </div>
    </header>
  );
};
