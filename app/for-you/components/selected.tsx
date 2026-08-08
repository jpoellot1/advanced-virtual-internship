import React from 'react'
import { useGetSelectedBookQuery } from '../../Redux/apiSlice';
import { FaPlayCircle } from 'react-icons/fa';

const Selected = () => {
    const {data, error, isLoading} = useGetSelectedBookQuery('')

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;

    const selectedBook = data?.[0];

  return (
    <>
      <audio>{selectedBook.audioLink}</audio>
      <a className="selected__book">
        <div className="selected__book--sub-title">{selectedBook.subTitle}</div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure
            className="book__image--wrapper"
            style={{ height: "140px", width: "140px", minWidth: "140px" }}
          >
            <img className="book__image" src={selectedBook.imageLink} alt="" />
          </figure>
          <div className="selected__book--text">
            <div className="selected__book--title">{selectedBook.title}</div>
            <div className="selected__book--author">{selectedBook.author}</div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon">
                <FaPlayCircle />
              </div>
              <div className="selected__book--duration">3mins 23secs</div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default Selected