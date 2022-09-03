import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import styles from "./Header.module.scss";

import { Button, Theme } from "@/components";
import User from "./User";
import { logout } from "@/utils/firebase";
import { logoutHandle } from "@/store/authSlice";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    toast.success("Successfully logged out");
  };

  const links = [
    { name: "HOME", to: "/" },
    { name: "MY BOOKS", to: user?.emailVerified ? "/my-books" : "/login" },
  ];

  return (
    <>
      <ul>
        {links.map((link) => {
          return (
            <li key={link.name}>
              <Link to={link.to}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.buttons}>
        {/* AUTH BUTTONS */}
        {!user?.emailVerified ? (
          <>
            <Link className={styles.link} to="/login">
              <Button text="LOGIN" theme="primary" />
            </Link>
            <Link className={styles.link} to="/signup">
              <Button text="SIGN UP" theme="primary" />
            </Link>
          </>
        ) : (
          <>
            {/* USER INFO */}
            <User />
            {/* LOGOUT BUTTON */}
            <Link className={styles.link} to="/">
              <Button click={handleLogout} text="LOGOUT" theme="red" />
            </Link>
            {/* PROFILE SETTINGS */}
            <Link className={clsx(styles.link, styles.settings)} to="/profile">
              <IoSettingsSharp className={styles["settings-icon"]} />
            </Link>
          </>
        )}
        {/* THEME SWITCHER */}
        <div className={styles.theme}>
          <Theme />
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
