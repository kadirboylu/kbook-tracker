import React from "react";

import styles from "./CollectionCard.module.scss";

import { CollectionModal } from "@/Components";

export const CollectionCard = ({ book }) => {
  return (
    <div className={styles["book-cover"]}>
      <img src={book.imageLinks} alt={book.title} />
      <CollectionModal book={book} />
    </div>
  );
};
