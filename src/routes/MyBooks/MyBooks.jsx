import React from "react";

import styles from "./MyBooks.module.scss";

import { CollectionRow } from "@/Components";

export const MyBooks = () => {
  return (
    <div className="md:w-[90%] w-[75%] m-auto">
      <CollectionRow category="Reading Now" />
      <CollectionRow category="Have Read" />
      <CollectionRow category="Books to read" />
      <CollectionRow category="Wish List" />
    </div>
  );
};
