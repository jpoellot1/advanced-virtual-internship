'use client'
import { useGetSuggestedBooksQuery } from "../../Redux/apiSlice";
import { Book } from "../../types";
import BookCard from "./BookCard";
import Skeleton from "@/app/components/skeleton";

const Suggested = () => {
    const {data, error, isLoading} = useGetSuggestedBooksQuery('')

    if (isLoading) {return(
      <>
      {Array.from({length: 5}).map((_, i)=> (
      <div key={i} className="skeleton__recommended--books-link">
        <Skeleton width='120px' height='170px' borderRadius='4px' className="skeleton__book--img"/>
        <Skeleton width='120px' height= '20px' borderRadius='4px' className='recommended__book--title' />
        <Skeleton width='80px' height= '20px' borderRadius='4px' className='recommended__book--author' />
        <Skeleton width='120px' height= '20px' borderRadius='4px' className='recommended__book--sub-title' />
        <Skeleton width='80px' height= '20px' borderRadius='4px' className='recommended__book--details' />
      </div>))}
      </>
    )}
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