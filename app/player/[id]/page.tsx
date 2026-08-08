'use client'
import React from 'react'
import { useGetInsideBookQuery } from '@/app/Redux/apiSlice';
import { useParams } from 'next/navigation';
import AudioPlayer from '../components/audioPlayer';

function Player() {
    const params = useParams()
    const id = params?.id as string
    
    const {data, error, isLoading} = useGetInsideBookQuery(id)
    
    if (isLoading) return <div>Loading data...</div>;
    if (error) return <div>An error occurred.</div>;
        
    const book = data

  return (
    <div id="__next">
        <div className="wrapper">
            <div className="summary">
                <div className="audio__book--summary">
                    <div className="audio__book--summary-title">
                        <b>{book.title}</b>
                    </div>
                    <div className="audio__book--summary-text">
                        {book.summary}
                    </div>
                </div>
            </div>
            <div className="audio__wrapper">
                <AudioPlayer
                audioLink= {book.audioLink}
                imageLink= {book.imageLink}
                title= {book.title}
                author= {book.author}
                />
            </div>
        </div>
    </div>
  )
}

export default Player