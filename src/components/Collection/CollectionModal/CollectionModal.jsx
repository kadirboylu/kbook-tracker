import React from "react";
import Popup from "reactjs-popup";
import clsx from "clsx";
import { BsInfo } from "react-icons/bs";

import styles from "./CollectionModal.module.scss";

import { CollectionDropdown } from "@/Components";

export const CollectionModal = ({ book }) => {
  const extraStyles = {
    dark: "dark:bg-slate-800 dark:text-white",
    button: "dark:bg-slate-100 dark:text-slate-800",
  };

  const overlayStyle = { background: "rgba(0,0,0,0.75)" };

  return (
    <Popup
      trigger={
        <button className={styles.trigger}>
          <BsInfo />
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
            <h2>{book.title}</h2>
          </div>
          <div className={styles.content}>
            <div className={styles["book-cover"]}>
              <div className="my-2 ml-4">
                <CollectionDropdown book={book} />
              </div>
              <img src={book.imageLinks} alt={book.title} />
            </div>
            <h3>Author(s)</h3>
            <p>
              {typeof book.authors === "object"
                ? book.authors.map((author, index) => {
                    const isLastAuthor =
                      book.authors.indexOf(author) === book.authors.length - 1;

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
              {book?.description
                ? book.description
                : "There is no description about the book."}
            </p>
          </div>
          <div className="h-[20px]"></div>
        </div>
      )}
    </Popup>
  );
};
