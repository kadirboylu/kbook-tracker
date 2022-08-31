import React from "react";
import clsx from "clsx";
import { FaGithub } from "react-icons/fa";

import styles from "./Footer.module.scss";

export const Footer = () => {
  const extraStyles = {
    base: "dark:bg-slate-800 dark:text-white",
  };

  return (
    <div className={clsx(styles.base, extraStyles.base)}>
      <span>
        See the source code on
        <a
          href="https://github.com/kadirboylu"
          target={"_blank"}
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </span>
      <strong>
        <a
          href="https://www.linkedin.com/in/kadirboylu/"
          target={"_blank"}
          rel="noreferrer"
        >
          Kadir Boylu
        </a>
      </strong>
    </div>
  );
};
