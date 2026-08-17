'use client'
import React, {useState} from 'react'
import { CiStar, CiClock2, CiBookmark } from "react-icons/ci";
import { TiMicrophoneOutline } from "react-icons/ti";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { useGetInsideBookQuery } from '@/app/Redux/apiSlice';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/components/useAuth';
import { useAppDispatch } from '@/app/Redux/lib/hooks';
import { openAuthModal } from '@/app/Redux/authModalSlice';
import Skeleton from '@/app/components/skeleton';

function Book() {
    const params = useParams()
    const id = params?.id as string
    const router = useRouter()
    const [duration, setDuration] = useState<string>('00:00')
    const {isPremium, user} = useAuth()
    const dispatch = useAppDispatch()

    const {data, error, isLoading} = useGetInsideBookQuery(id)

    if (isLoading) {return (
        <div className="wrapper">
            <div className="row">
                <div className="container">
                    <div className="inner__wrapper">
                        <div className="skeleton__book">
                            <Skeleton width='500px' height='30px' borderRadius='4px' className="inner-book__title"/>
                            <Skeleton width='200px' height='30px' borderRadius='4px' className="inner-book__author"/>
                            <Skeleton width='500px' height='30px' borderRadius='4px' className="inner-book__sub-title"/>
                            <Skeleton width='300px' height='60px' borderRadius='4px'  className="inner-book__wrapper"/>
                            <Skeleton width='200px' height='40px' borderRadius='4px'  className="inner-book__btn--wrapper"/>
                            <Skeleton width='150px' height='30px' borderRadius='4px'  className="inner-book__bookmark"/>
                            <Skeleton width='300px' height='40px' borderRadius='4px'  className="inner-book__secondary--title"/>
                            <Skeleton width='500px' height='400px' borderRadius='4px'  className="inner-book__book--description"/>
                            <Skeleton width='500px' height='400px' borderRadius='4px'  className="inner-book__author--description"/>
                        </div>
                        <Skeleton width='300px' height='300px' borderRadius='4px'  className="inner-book__img--wrapper"/>
                    </div>
                </div>
            </div>
        </div>
    )}
    if (error) return <div>An error occurred.</div>;
    
    const book = data

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

    const handleNavigate= () => {
        if(!user) {  
            dispatch(openAuthModal('login'))
            return
        }
        if(book.subscriptionRequired) {
            if(isPremium) {
            router.push(`/player/${id}`)
            }else {
            router.push('/choose-plan')
            } 
            return
        } 
        router.push(`/player/${id}`)
    }

  return (
    <div id="__next">
        <div className="wrapper">
            <div className="row">
                <audio src={book.audioLink}
                preload='metadata'
                onLoadedMetadata={handleDuration}
                ></audio>
                <div className="container">
                    <div className="inner__wrapper">
                        <div className="inner__book">
                            <div className="inner-book__title">{book.title}</div>
                            <div className="inner-book__author">{book.author}</div>
                            <div className="inner-book__sub-title">{book.subTitle}</div>
                            <div className="inner-book__wrapper">
                                <div className="inner-book__description--wrapper">
                                    <div className="inner-book__description">
                                        <div className="inner-book__icon">
                                            <CiStar />
                                        </div>
                                        <div className="inner-book__overall--rating">{book.averageRating} </div>
                                        <div className="inner-book__total--rating">{`(${book.totalRating} ratings)`}</div>
                                    </div>
                                    <div className="inner-book__description">
                                        <div className="inner-book__icon">
                                            <CiClock2 />
                                        </div>
                                        <div className="inner-book__duration">{duration}</div>
                                    </div>
                                    <div className="inner-book__description">
                                        <div className="inner-book__icon">
                                            <TiMicrophoneOutline />
                                        </div>
                                        <div className="inner-book__type">{book.type}</div>
                                    </div>
                                    <div className="inner-book__description">
                                        <div className="inner-book__icon">
                                            <HiOutlineLightBulb />
                                        </div>
                                        <div className="inner-book__key--ideas">{book.keyIdeas} Key ideas</div>
                                    </div>
                                </div>
                            </div>
                            <div className="inner-book__btn--wrapper">
                                    <button className="inner-book__read--btn" onClick={handleNavigate}>
                                        <div className="inner-book__read--icon">
                                            <LuBookOpenText />
                                        </div>
                                        <div className="inner-book__read--text">Read</div>
                                    </button>
                                <button className="inner-book__read--btn" onClick={handleNavigate}>
                                    <div className="inner-book__read--icon">
                                        <TiMicrophoneOutline />
                                    </div>
                                    <div className="inner-book__read--text">Listen</div>
                                </button>
                            </div>
                            <div className="inner-book__bookmark">
                                <div className="inner-book__bookmark--icon">
                                    <CiBookmark />
                                </div>
                                <div className="inner-book__bookmark--text">Add title to My Library</div>
                            </div>
                            <div className="inner-book__secondary--title">What's it about?</div>
                            <div className="inner-book__tags--wrapper">
                                <div className="inner-book__tag">{book.tags[0]}</div>
                                <div className="inner-book__tag">{book.tags[1]}</div>
                            </div>
                            <div className="inner-book__book--description">
                                {book.bookDescription}
                            </div>
                            <h2 className="inner-book__secondary--title">About the author</h2>
                            <div className="inner-book__author--description">
                                {book.authorDescription}
                            </div>
                        </div>
                        <div className="inner-book__img--wrapper">
                            <figure className="book__image--wrapper" style= {{height: '300px', width: '300px', minWidth: '300px'}}>
                                <img src={book.imageLink} alt="book" className="book__image" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Book