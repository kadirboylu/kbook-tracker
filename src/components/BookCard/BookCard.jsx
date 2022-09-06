import React from "react";
import clsx from "clsx";

import styles from "./BookCard.module.scss";

import { Modal } from "@/Components";

export const BookCard = ({ book }) => {
  const extraStyles = {
    dark: "dark:bg-slate-700 dark:text-white",
  };

  const imgURL = book.volumeInfo.imageLinks?.thumbnail
    ? book.volumeInfo.imageLinks.thumbnail
    : "https://books.google.com.tr/googlebooks/images/no_cover_thumb.gif";

  return (
    <div className={clsx(styles.base, extraStyles.dark)}>
      <h2>{book.volumeInfo.title}</h2>
      {/* BOOK COVER */}
      <div className={styles["book-cover"]}>
        <img src={imgURL} alt={book.volumeInfo.title} />
      </div>
      <div className={styles["book-info"]}>
        {/* BOOK TİTLE */}
        {/* AUTHORS */}
        <h3>Author(s)</h3>
        <div className={styles.author}>
          {book.volumeInfo?.authors
            ? book.volumeInfo.authors.map((author, index) => {
                const isLastAuthor =
                  book.volumeInfo.authors.indexOf(author) ===
                  book.volumeInfo.authors.length - 1;

                return (
                  <span key={index}>
                    {author}
                    {isLastAuthor ? "" : ", "}
                  </span>
                );
              })
            : "No author found"}
        </div>
        {/* DESCRIPTION */}
        <div>
          <h3>Description</h3>
          <p className="text-justify">
            {book.volumeInfo?.description
              ? book.volumeInfo.description
              : "There is no description about the book."}
          </p>
        </div>
        <Modal book={book} />
      </div>
    </div>
  );
};
