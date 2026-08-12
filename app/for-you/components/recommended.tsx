'use client'
import React from "react";
import { useGetRecommendedBooksQuery } from "../../Redux/apiSlice";
import { Book } from "../../types";
import BookCard from "./BookCard";

const Recommended = () => {
    const {data, error, isLoading} = useGetRecommendedBooksQuery('')

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;

    const recommendedBooks = data

  return (
    <>
    {recommendedBooks.map((recommendedBook : Book) =>(
      <BookCard key={recommendedBook.id} book={recommendedBook}/>
    ))}
    </>
  );
}

export default Recommended