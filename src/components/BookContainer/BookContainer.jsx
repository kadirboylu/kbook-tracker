import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./BookContainer.module.scss";

import { BookCard, Loading } from "@/components";
import { fetchBooks, loadMore } from "@/store/bookSlice";

export const BookContainer = () => {
  const { books, isLoading, hasMore, index, query } = useSelector(
    (state) => state.book
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (query === "") return;

    dispatch(fetchBooks({ q: query, index }));
  }, [query, index]);

  return (
    <InfiniteScroll
      dataLength={books.length}
      hasMore={hasMore}
      next={() => hasMore && dispatch(loadMore())}
      loader={isLoading && hasMore && <Loading />}
      endMessage={
        query !== "" &&
        !hasMore && (
          <h2 className={styles.endMessage}>
            We couldn't find any more results for your search.
          </h2>
        )
      }
    >
      <div className="flex flex-wrap items-center justify-center">
        {books.map((book, index) => {
          return <BookCard key={`${index}-${book.id}`} book={book} />;
        })}
      </div>
    </InfiniteScroll>
  );
};
