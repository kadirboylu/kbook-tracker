import React from "react";
import Popup from "reactjs-popup";
import clsx from "clsx";
import { CgArrowLongRight } from "react-icons/cg";

import styles from "./Modal.module.scss";

export const Modal = ({ book }) => {
  const extraStyles = {
    dark: "dark:bg-slate-800 dark:text-white",
    button: "dark:bg-slate-100 dark:text-slate-800",
  };

  const imgURL = book.volumeInfo.imageLinks?.thumbnail
    ? book.volumeInfo.imageLinks.thumbnail
    : "https://books.google.com.tr/googlebooks/images/no_cover_thumb.gif";

  return (
    <Popup
      trigger={
        <button className={styles.trigger}>
          Click to see more <CgArrowLongRight />
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className={clsx(styles.modal, extraStyles.dark)}>
          <button
            className={clsx(styles.close, extraStyles.button)}
            onClick={close}
          >
            &times;
          </button>
          <div className={styles.header}>
            <h2>{book.volumeInfo.title}</h2>
          </div>
          <div className={styles.content}>
            <div className={styles["book-cover"]}>
              <img src={imgURL} alt={book.volumeInfo.title} />
            </div>
            <h3>Author(s)</h3>
            <p>
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
            </p>
            <h3>Description</h3>
            <p>
              {book.volumeInfo?.description
                ? book.volumeInfo.description
                : "There is no description about the book."}
            </p>
          </div>
          <div className="h-[20px]"></div>
        </div>
      )}
    </Popup>
  );
};
