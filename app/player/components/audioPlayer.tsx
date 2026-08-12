'use client'
import React, {useState, useRef, useEffect} from "react";
import { RiReplay10Line, RiForward10Line } from "react-icons/ri";
import { IoPlaySharp } from "react-icons/io5";
import { IoPause } from "react-icons/io5";


type AudioPlayerProps = {
    author: string;
    imageLink :string;
    audioLink : string;
    title: string;
}


function AudioPlayer ({audioLink, imageLink, title, author} : AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const togglePlayPause = () => {
        if(!audioRef.current) return;

        if(isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying)
    }

    const skipBackward = () => {
        if (!audioRef.current) return;
        const newTime = Math.max(audioRef.current.currentTime - 10, 0)
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const skipForward = () => {
        if (!audioRef.current) return;
        const newTime = Math.min(audioRef.current.currentTime + 10, duration)
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleTimeUpdate = () => {
        if(audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
        }
    }

    const handleDuration = () => {
        if(audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    }

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        if(audioRef.current) {
            audioRef.current.currentTime = newTime
            setCurrentTime(newTime)
        }
    }

    const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    const formatTime = (timeInSeconds: number): string => {
        if(isNaN(timeInSeconds)) return '0:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const progressPercentage = duration && !isNaN(duration) && duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio 
      src={audioLink}
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleDuration}
      onEnded={handleEnded}
      preload="metadata"
      />
      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <figure
            className="book__image--wrapper"
            style={{ height: "48px", width: "48px", minWidth: "48px" }}
          >
            <img className="book__image" src={imageLink} alt="book" />
          </figure>
        </figure>
        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{title}</div>
          <div className="audio__track--author">{author}</div>
        </div>
      </div>
      <div className="audio__controls--wrapper">
        <div className="audio__controls">
          <button className="audio__controls--btn" onClick={skipBackward}>
            <RiReplay10Line />
          </button>
          <button className="audio__controls--btn audio__controls--btn-play" onClick={togglePlayPause}>
            {isPlaying ? <IoPause className="audio__controls--pause-icon"/> : <IoPlaySharp className="audio__controls--play-icon" />}
          </button>
          <button className="audio__controls--btn" onClick={skipForward}>
            <RiForward10Line />
          </button>
        </div>
      </div>
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(currentTime)}</div>
        <input
          type="range"
          className="audio__progress--bar"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, rgb(43, 217, 124) ${progressPercentage}%, rgb(109, 120, 125) ${progressPercentage}%)`
          }}
        />
        <div className="audio__time">{formatTime(duration)}</div>
      </div>
    </>
  );
};

export default AudioPlayer;
