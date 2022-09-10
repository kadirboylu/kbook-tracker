import React from "react";
import Popup from "reactjs-popup";
import clsx from "clsx";
import { CgArrowLongRight } from "react-icons/cg";

import styles from "./Modal.module.scss";

import { DropdownMenu } from "@/Components";

export const Modal = ({ book }) => {
  const extraStyles = {
    dark: "dark:bg-slate-800 dark:text-white",
    button: "dark:bg-slate-100 dark:text-slate-800",
    trigger: "dark:bg-slate-500 dark:text-slate-100",
  };

  const imgURL = book.volumeInfo.imageLinks?.thumbnail
    ? book.volumeInfo.imageLinks.thumbnail
    : "https://books.google.com.tr/googlebooks/images/no_cover_thumb.gif";

  const overlayStyle = { background: "rgba(0,0,0,0.75)" };

  return (
    <Popup
      trigger={
        <button className={clsx(styles.trigger, extraStyles.trigger)}>
          <CgArrowLongRight /> Click to see more
        </button>
      }
      {...{ overlayStyle }}
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
              <div className="mb-2 ml-4">
                <DropdownMenu book={book} />
              </div>
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
          <div className="h-[20px] z-20"></div>
        </div>
      )}
    </Popup>
  );
};
