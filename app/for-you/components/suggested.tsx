import React from "react";
import { useGetSuggestedBooksQuery } from "../../Redux/apiSlice";
import { CiClock2, CiStar } from "react-icons/ci";
import { Book } from "../../types";

const Suggested = () => {
    const {data, error, isLoading} = useGetSuggestedBooksQuery('')

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;

    const suggestedBook = data

  return (
    <>
    {suggestedBook.map((suggestedBook : Book) =>(
      <a key={suggestedBook.id}href="" className="for-you__recommended--books-link">
        <div className="book__pill">Premium</div>
        <audio>{suggestedBook.audioLink}</audio>
        <figure className="book__image--wrapper">
          <img
            className="book__image"
            src={suggestedBook.imageLink}
            alt=""
          />
        </figure>
        <div className="recommended__book--title">
          {suggestedBook.title}
        </div>
        <div className="recommended__book--author">{suggestedBook.author}</div>
        <div className="recommended__book--sub-title">
          {suggestedBook.subTitle}
        </div>
        <div className="recommended__book--details-wrapper">
          <div className="recommended__book--details">
            <div className="recommended__book--details-icon">
              <CiClock2 />
            </div>
            <div className="recommended__book--details-text">03:24</div>
          </div>
          <div className="recommended__book--details">
            <div className="recommended__book--details-icon">
              <CiStar />
            </div>
            <div className="recommended__book--details-text">{suggestedBook.averageRating}</div>  
          </div>
        </div>
      </a>
    ))}
    </>
  );
}

export default Suggested