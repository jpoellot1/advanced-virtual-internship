'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { CiClock2, CiStar } from "react-icons/ci";
import { Book } from "../../types"
import { useAuth } from '@/app/components/useAuth';


export default function BookCard({book}: {book : Book}) {
    const [duration, setDuration] = useState<string>('00:00')
    const {isPremium, isLoading} = useAuth()
    if(isLoading) return null;

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
    <Link key={book.id}href={`./book/${book.id}`} className="for-you__recommended--books-link">
            {book.subscriptionRequired && !isPremium && (
              <div className="book__pill">Premium</div>
            )}
            <audio src={book.audioLink}
            preload='metadata'
            onLoadedMetadata={handleDuration}
            ></audio>
            <figure className="book__image--wrapper">
              <img
                className="book__image"
                src={book.imageLink}
                alt=""
              />
            </figure>
            <div className="recommended__book--title">{book.title}</div>
            <div className="recommended__book--author">{book.author}</div>
            <div className="recommended__book--sub-title">{book.subTitle}</div>
            <div className="recommended__book--details-wrapper">
              <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                  <CiClock2 />
                </div>
                <div className="recommended__book--details-text">{duration}</div>
              </div>
              <div className="recommended__book--details">
                <div className="recommended__book--details-icon">
                  <CiStar />
                </div>
                <div className="recommended__book--details-text">{book.averageRating}</div>  
              </div>
            </div>
          </Link>
  )
}
