import React from "react";
import { useGetRecommendedBooksQuery } from "../../Redux/apiSlice";
import { CiClock2, CiStar } from "react-icons/ci";
import { Book } from "../../types";

const Recommended = () => {
    const {data, error, isLoading} = useGetRecommendedBooksQuery('')

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;
    console.log(data)

    const recommendedBooks = data

  return (
    <>
    {recommendedBooks.map((recommendedBook : Book) =>(
      <a key={recommendedBook.id}href={`./book/${recommendedBook.id}`} className="for-you__recommended--books-link">
        <audio>{recommendedBook.audioLink}</audio>
        <figure className="book__image--wrapper">
          <img
            className="book__image"
            src={recommendedBook.imageLink}
            alt=""
          />
        </figure>
        <div className="recommended__book--title">
          {recommendedBook.title}
        </div>
        <div className="recommended__book--author">{recommendedBook.author}</div>
        <div className="recommended__book--sub-title">
          {recommendedBook.subTitle}
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
            <div className="recommended__book--details-text">{recommendedBook.averageRating}</div>  
          </div>
        </div>
      </a>
    ))}
    </>
  );
}

export default Recommended