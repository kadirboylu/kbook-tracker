import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import clsx from "clsx";

import styles from "./CollectionDropdown.module.scss";

import { addBooks, updateBooks } from "@/utils/firebase";
import { useEffect } from "react";
import { useOutsideClick } from "@/hook/useOutsideClick";

export const CollectionDropdown = ({ book }) => {
  const navigate = useNavigate();
  const ref = useRef();
  const user = useSelector((store) => store.auth.user);
  const { bookList, hasCollection, collectionId } = useSelector(
    (store) => store.firestore
  );

  const [text, setText] = useState("Choose Category");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOutsideClick(ref, () => {
    setIsDropdownOpen(() => false);
  });

  const extraStyles = {
    menu: "dark:bg-slate-500 dark:text-white",
  };

  const handleClick = async (e) => {
    if (!user) {
      navigate("/login");
      toast.error("Please login to add books to your collection");
      return;
    }

    const { id, title, authors, description, imageLinks } = book;

    // set book object
    const bookInfo = {
      id,
      category: e.target.textContent,
      title,
      authors,
      description,
      imageLinks,
    };

    if (e.target.textContent === "Remove") {
      setText("Choose Category");
      // find the clicked book in the bookList if it isn't in the bookList, return -1
      const findBook = bookList.find((book) => book.id === id);

      // if the book is in the bookList, remove it
      if (findBook) {
        const newList = bookList.filter((item) => item.id !== id);

        await updateBooks(collectionId, {
          name: user.displayName,
          uid: user.uid,
          books: [...newList],
        });
        toast.error("Book removed from collection");
      }
    } else {
      setText(e.target.textContent);

      // check user's collection
      if (hasCollection) {
        // if the book is already in the bookList, don't add it again just update the category
        let hasSameBook = false;
        const newList = bookList.map((item) => {
          // if the book is already in the bookList, update the category
          if (item.id === bookInfo.id) {
            hasSameBook = true;
            return bookInfo;
          } else {
            return item;
          }
        });

        // if the book is not in the bookList, add it to the bookList and update the collection in firestore
        hasSameBook
          ? await updateBooks(collectionId, {
              name: user.displayName,
              uid: user.uid,
              books: [...newList],
            })
          : await updateBooks(collectionId, {
              name: user.displayName,
              uid: user.uid,
              books: [...newList, bookInfo],
            });
        toast.success("Book added to your collection!");
      } else {
        // if the user doesn't have a collection, create a new collection and add the book to the bookList
        await addBooks({
          name: user.displayName,
          uid: user.uid,
          books: [bookInfo],
        });
        toast.success("Book added to your collection!");
      }
    }
  };

  useEffect(() => {
    const { id } = book;

    bookList.map((item) => {
      if (item.id === id) {
        setText(item.category);
      }
    });
  }, [bookList]);

  return (
    <div
      onClick={() => setIsDropdownOpen(() => !isDropdownOpen)}
      ref={ref}
      className="relative"
    >
      <button
        className={clsx(
          styles.trigger,
          extraStyles.menu,
          "dark:hover:text-blue-400"
        )}
      >
        {text}
      </button>
      {isDropdownOpen && (
        <div className={clsx(styles.menu, extraStyles.menu)}>
          {text !== "Wish List" && (
            <button onClick={handleClick} className={styles["menu-item"]}>
              Wish List
            </button>
          )}
          {text !== "Books to read" && (
            <button onClick={handleClick} className={styles["menu-item"]}>
              Books to read
            </button>
          )}
          {text !== "Have Read" && (
            <button onClick={handleClick} className={styles["menu-item"]}>
              Have Read
            </button>
          )}
          {text !== "Reading Now" && (
            <button onClick={handleClick} className={styles["menu-item"]}>
              Reading Now
            </button>
          )}
          {text !== "Choose Category" && (
            <button onClick={handleClick} className={styles["menu-item"]}>
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};
