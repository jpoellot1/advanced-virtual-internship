'use client'
import React, {useState} from 'react'
import { useGetSelectedBookQuery } from '../../Redux/apiSlice';
import { FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';

const Selected = () => {
    const {data, error, isLoading} = useGetSelectedBookQuery('')
    const [duration, setDuration] = useState<string>('00:00')

    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;

    const selectedBook = data?.[0];

    const formatTime = (timeInSeconds: number): string => {
      if(isNaN(timeInSeconds)) return '0:00';
          const minutes = Math.floor(timeInSeconds / 60);
          const seconds = Math.floor(timeInSeconds % 60);
          return `${minutes} mins ${seconds} secs`;
      }
    
    const handleDuration = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        const audioSeconds = e.currentTarget.duration;
        setDuration(formatTime(audioSeconds))
    }

  return (
    <>
      <audio src={selectedBook.audioLink}
      preload='metadata'
      onLoadedMetadata={handleDuration}
      ></audio>
      <Link className="selected__book" href={`/book/${selectedBook.id}`}>
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
              <div className="selected__book--duration">{duration}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Selected