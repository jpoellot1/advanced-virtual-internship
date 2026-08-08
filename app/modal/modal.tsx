'use client'
import React from 'react'
import Image from 'next/image'
import Google from "../Assets/google.png"
import { BsFillPersonFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '@/app/Redux/lib/hooks';
import { closeAuthModal, setAuthModalView } from '../Redux/authModalSlice';

function Modal() {
    const dispatch = useAppDispatch();
    const {isOpen, view} = useAppSelector((state) => state.authModal)

    if(!isOpen) return null;


  return (
    <>
    {view === 'login' ? (
    <div className="auth__wrapper">
        <div className='auth'>
            <div className="auth__content">
                <div className="auth__title">Log in to Summarist</div>
                <button className='btn guest__btn--wrapper'>
                    <figure className='google__icon--mask guest__icon--mask'><BsFillPersonFill/></figure>
                    <div>Login as Guest</div>
                </button>
                <div className="auth__separator">
                    <span className='auth__separator--text'>or</span>
                </div>
                <button className='btn google__btn--wrapper'>
                    <figure className='google__icon--mask'>
                        <Image src={Google} alt="google"/>
                    </figure>
                    <div>Login with Google</div>
                </button>
                <div className="auth__separator">
                    <span className='auth__separator--text'>or</span>
                </div>
                <form className='auth__main--form'>
                    <input className='auth__main--input' type="email" placeholder='Email Address' />
                    <input className='auth__main--input' type="password" placeholder='Password'/>
                    <button className='btn'><span>Login</span></button>
                </form>
            </div>
            <button className='auth__switch--btn' onClick={() => dispatch(setAuthModalView('register'))}>Don't have an account?</button>
            <div className="auth__close--btn" onClick= {() => dispatch(closeAuthModal())}>
                <IoClose />
            </div>
        </div>
    </div>
    ) : (
        <div className="auth__wrapper">
        <div className='auth'>
            <div className="auth__content">
                <div className="auth__title">Sign up to Summarist</div>
                <button className='btn google__btn--wrapper'>
                    <figure className='google__icon--mask'>
                        <Image src={Google} alt="google"/>
                    </figure>
                    <div>Sign up with Google</div>
                </button>
                <div className="auth__separator">
                    <span className='auth__separator--text'>or</span>
                </div>
                <form className='auth__main--form'>
                    <input className='auth__main--input' type="email" placeholder='Email Address' />
                    <input className='auth__main--input' type="password" placeholder='Password'/>
                    <button className='btn'><span>Sign Up</span></button>
                </form>
            </div>
            <button className='auth__switch--btn' onClick={() => dispatch(setAuthModalView('login'))}>Already have an account?</button>
            <div className="auth__close--btn" onClick={() => dispatch(closeAuthModal())}>
                <IoClose />
            </div>
        </div>
    </div>
    )
    }
    </>
  )
}


export default Modal