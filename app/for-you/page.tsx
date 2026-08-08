'use client'
import React from 'react'
import Recommended from "./components/recommended"
import Suggested from './components/suggested';
import Selected from './components/selected';


export default function ForYouPage() {
    
  return (
    <div id="__next">
        <div className="wrapper">
            <div className="row">
                <div className="container">
                    <div className="for-you__wrapper">
                        <div className="for-you__title">Selected just for you</div>
                            <Selected />
                        <div>
                            <div className="for-you__title">Recommended For You</div>
                            <div className="for-you__sub--title">We think you'll like these</div>
                            <div className="for-you__recommended--books">
                                <Recommended />
                            </div>
                        </div>
                        <div>
                            <div className="for-you__title">Suggested For You</div>
                            <div className="for-you__sub--title">Browse these books</div>
                            <div className="for-you__recommended--books">
                                <Suggested />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

