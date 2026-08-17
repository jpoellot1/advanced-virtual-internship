'use client'
import React from 'react'
import { useAuth } from '../components/useAuth'
import { useAppDispatch } from '@/app/Redux/lib/hooks';
import { openAuthModal } from '@/app/Redux/authModalSlice';
import { useRouter } from 'next/navigation';
import Login from '../Assets/login.png'
import Image from 'next/image';
import Skeleton from '../components/skeleton';

export default function Settings() {
    const {user, isPremium, isLoading} = useAuth()
    const dispatch = useAppDispatch()
    if(isLoading) {
        return (
          <div className="wrapper">
            <div className="container">
              <div className="row">
                <div className="section__title page__title"> Settings</div>
                <div className="setting__content">
                  <Skeleton
                    width="160px"
                    height="24px"
                    borderRadius="4px"
                    className="settings__sub--title"
                  />
                  <Skeleton
                    width="280px"
                    height="24px"
                    borderRadius="4px"
                    className="settings__text"
                  />
                </div>
                <div className="setting__content">
                  <Skeleton
                    width="160px"
                    height="24px"
                    borderRadius="4px"
                    className="settings__sub--title"
                  />
                  <Skeleton
                    width="280px"
                    height="24px"
                    borderRadius="4px"
                    className="settings__text"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    };

  return (
    <div id="next">
        <div className="wrapper">
            <div className="container">
                <div className="row">
                    <div className="section__title page__title"> Settings</div>
                    {!user ? (
                        <>
                        <div className="settings__login--wrapper">
                            <Image src={Login} alt="login"></Image>
                            <div className="settings__login--text">Log in to your account to see your details.</div>
                            <button className="btn settings__login--btn" onClick={() => dispatch(openAuthModal('login'))}>Login</button>
                        </div>
                        </>
                    ):(
                        <>
                        {!isPremium ? (
                        <>
                            <div className="setting__content">
                                <div className="settings__sub--title"> Your Subscription Plan</div>
                                <div className="settings__text">{user?.subscriptionStatus}</div>
                                <a href="/choose-plan" className="btn settings__upgrade--btn">Upgrade to Premium</a>
                            </div>
                            <div className="setting__content">
                                <div className="settings__sub--title">Email</div>
                                <div className="settings__text">{user?.email}</div>
                            </div>
                        </>
                        ) : (
                            <>
                            <div className="setting__content">
                                <div className="settings__sub--title"> Your Subscription Plan</div>
                                <div className="settings__text">{user?.subscriptionStatus}</div>
                            </div>
                            <div className="setting__content">
                                <div className="settings__sub--title">Email</div>
                                <div className="settings__text">{user?.email}</div>
                            </div>
                            </>
                        )}
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
