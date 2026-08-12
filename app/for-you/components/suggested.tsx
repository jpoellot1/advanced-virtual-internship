'use client'
import React from "react";
import { useGetSuggestedBooksQuery } from "../../Redux/apiSlice";
import { Book } from "../../types";
import BookCard from "./BookCard";

const Suggested = () => {
    const {data, error, isLoading} = useGetSuggestedBooksQuery('')

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;

    const suggestedBook = data

  return (
    <>
    {suggestedBook.map((suggestedBook : Book) =>(
      <BookCard key={suggestedBook.id} book={suggestedBook}/>
    ))}
    </>
  );
}

export default Suggested