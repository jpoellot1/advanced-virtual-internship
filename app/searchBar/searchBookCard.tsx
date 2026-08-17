'use client'
import React, {useState} from 'react'
import Image from 'next/image';
import { CiClock2} from "react-icons/ci";
import { AudioPlayerProps } from '../types';

export default function SearchBookCard({audioLink, imageLink, title, author, id} : AudioPlayerProps) {
    const [duration, setDuration] = useState<string>('00:00')
    
    
    const formatTime = (timeInSeconds: number): string => {
        if(isNaN(timeInSeconds)) return '0:00';
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = Math.floor(timeInSeconds % 60);
            const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${formattedMinutes}:${formattedSeconds}`;
    }

    const handleDuration = (e: React.SyntheticEvent<HTMLAudioElement>) => {
                const audioSeconds = e.currentTarget.duration;
                setDuration(formatTime(audioSeconds))
    }

  return (
    <>
      <a href={`./book/${id}`} className="search__book--link">
        <audio src={audioLink}
        preload='metadata'
        onLoadedMetadata={handleDuration}>
        </audio>
        <figure
          className="book__image--wrapper"
          style={{height: '80px', width: '80px', minWidth: "80px", position: 'relative', overflow: 'hidden'}}
        >
          <Image
            className="book__image"
            src={imageLink}
            alt="book"
            fill
          />
        </figure>
        <div>
          <div className="search__book--title">{title}</div>
          <div className="search__book--author">{author}</div>
          <div className="search__book--duration">
            <div className="recommended__book--details">
              <div className="recommended__book--details-icon">
                <CiClock2 />
              </div>
              <div className="recommended__book--details-text">{duration}</div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
