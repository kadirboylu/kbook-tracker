import React from "react";

import styles from "./DefaultLayout.module.scss";

import { Header, Footer } from "@/components";

export const DefaultLayout = (props) => {
  return (
    <div>
      <div id="header">
        <Header />
      </div>
      <div
        id="routes"
        className={styles.routes}
        style={{ minHeight: "calc(100vh - 132px)" }}
      >
        {props.children}
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};
