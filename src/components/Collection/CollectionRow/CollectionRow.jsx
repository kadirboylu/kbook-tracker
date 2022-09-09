import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Carousel, CollectionCard } from "@/Components";
import { useEffect } from "react";

export const CollectionRow = ({ category }) => {
  const [show, setShow] = useState(false);

  const { bookList } = useSelector((store) => store.firestore);

  useEffect(() => {
    const filteredBooks = bookList.filter((book) => book.category === category);
    if (filteredBooks.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [bookList, category]);

  return (
    <div className="relative w-full select-none my-2 min-h-[200px]">
      <h2 className="font-semibold text-xl my-4">{category}</h2>
      <Carousel>
        {bookList.map((book) => {
          if (book.category === category) {
            return <CollectionCard key={book.id} book={book} />;
          }
        })}
      </Carousel>
      {!show && (
        <div className="absolute text-center text-gray-500 h-full top-[20px] w-full  flex items-center justify-center">
          <p>There are no books in this category.</p>
        </div>
      )}
    </div>
  );
};
