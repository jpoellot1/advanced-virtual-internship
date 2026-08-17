'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import Google from "../Assets/google.png"
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '@/app/Redux/lib/hooks';
import { closeAuthModal, setAuthModalView} from '../Redux/authModalSlice';
import {auth, db} from "../../firebase"
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore'
import { useRouter, usePathname } from 'next/navigation';
import { BsFillPersonFill } from 'react-icons/bs'

function Modal() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const pathname = usePathname()
    const {isOpen, view, redirectUrl} = useAppSelector((state) => state.authModal)
    const isSignUp = view ==='register'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loadingType, setLoadingType] = useState<'guest' | 'google'| 'email' | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const guestEmail = 'guest@gmail.com'    
    const guestPassword = 'Guest123'

    if(!isOpen) return null;

    const withTimeout = <T,>(promise: Promise<T>, timeoutMs= 4000): Promise<T> => {
        return Promise.race([
            promise,
            new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out. Please try again.')), timeoutMs)
            ),
        ])
    }

    const closeModal = () => {
        dispatch(closeAuthModal())
        setErrorMessage(null)
        setEmail('')
        setPassword('')
        setLoadingType(null)
    }

    const handlePostAuthRedirect = () => {
      closeModal()
      if(redirectUrl) {
        router.push(redirectUrl)
        return
      }
      if(pathname === '/') {
        router.push('/for-you')
      }
      router.refresh()
    }

    const handleGuestLogin = async () => {
            setLoadingType('guest')
            setErrorMessage(null)
            try {
                await signInWithEmailAndPassword(auth, guestEmail, guestPassword)
                handlePostAuthRedirect() 
            } catch(error: any) {
                console.error('Error logging in as Guest:', error);
                setErrorMessage('Failed to log in as Guest')
            }
            finally{
                setLoadingType(null)
            }
        }

    const handleGoogleLogin = async () =>{
            setLoadingType('google');
            setErrorMessage(null)
            try{
                const provider = new GoogleAuthProvider();
                provider.setCustomParameters({prompt: 'select_account'})
                const userCredential = await withTimeout(signInWithPopup(auth, provider));
                const user = userCredential.user

                await setDoc(doc(db, 'users', user.uid), {
                  email: user.email,
                  subscriptionStatus: 'basic',
                  createdAt: new Date().toISOString(),
                }, { merge: true });

                handlePostAuthRedirect()
            } catch (error: any) {
                console.error('Email Auth Error:', error)
                if (error.code === 'auth/popup-closed-by-user') {
                    setErrorMessage('Google sign-in popup was closed before completing')
                    console.log(error.code)
                } else if(error.code === 'auth/popup-blocked'){
                    setErrorMessage('Pop-up was blocked by your browser. Please allow pop-ups.')
                } else {
                    setErrorMessage('Google Sign-In Error')
                }
            } finally {
                setLoadingType(null)
            }
        }

    const handleEmailAuth = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if(!email || !password) {
            setErrorMessage('Please enter both email and password.')
            return;
        }
        if(isSignUp && password.length < 6) {
            setErrorMessage('Password must be at least 6 characters')
            return;
        }
        setLoadingType('email')
        setErrorMessage(null)
        try {
            if(isSignUp) {
              const userCredential = await withTimeout(createUserWithEmailAndPassword(auth, email, password));
              const user = userCredential.user

              await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                subscriptionStatus: 'basic',
                createdAt: new Date().toISOString(),
              }, {merge: true})
            }else {
                await withTimeout(signInWithEmailAndPassword(auth, email, password))
            }
            handlePostAuthRedirect()
        } catch(error: any) {
            console.error('Email Auth Error:', error)
            if(error.code === 'auth/email-already-in-use'){
                setErrorMessage('An account for this email already exists')
            } else if(error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrorMessage('Invalid email or password')
            } else if(error.code === 'auth/invalid-email') {
                setErrorMessage('Please enter a valid email address')
            } else if(error.code === 'auth/too-many-requests') {
                setErrorMessage('Too many failed attempts. Try again later')
            } else if(error.code === "auth/weak-password"){
                setErrorMessage('Password must be at least 6 characters')
            } else {
                setErrorMessage('Failed to log in')
            }
        } finally {
            setLoadingType(null)
        }
    }

    const createUserWithGoogle = () =>{

    }

  return (
    <>
      {view === "login" ? (
        <div className="auth__wrapper">
          <div className="auth">
            <div className="auth__content">
              <div className="auth__title">Log in to Summarist</div>
              {errorMessage && (
                <div className="auth__error">{errorMessage}</div>
              )}
              <button
                className="btn guest__btn--wrapper"
                onClick={handleGuestLogin}
                disabled={loadingType !== null}
              >
                <figure className="google__icon--mask guest__icon--mask">
                  <BsFillPersonFill />
                </figure>
                <div>
                  {loadingType === "guest" ? "Logging in" : "Login as Guest"}
                </div>
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
              <button
                className="btn google__btn--wrapper"
                onClick={handleGoogleLogin}
                disabled={loadingType !== null}
              >
                <figure className="google__icon--mask">
                  <Image src={Google} alt="google" />
                </figure>
                <div>
                  {loadingType === "google" ? "Logging in" : "Login with Google"}
                </div>
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
              <form className="auth__main--form" onSubmit={handleEmailAuth}>
                <input
                  className="auth__main--input"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingType !== null}
                  required
                />
                <input
                  className="auth__main--input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loadingType !== null}
                  required
                />
                <button
                  className="btn"
                  type="submit"
                  disabled={loadingType !== null}
                >
                  {loadingType === "email" ? "Logging In" : "Login"}
                </button>
              </form>
            </div>
            <button
              className="auth__switch--btn"
              onClick={() => dispatch(setAuthModalView("register"))}
              >
              Don't have an account?
            </button>
            <div className="auth__close--btn" onClick={closeModal}>
              <IoClose />
            </div>
          </div>
        </div>
      ) : (
        <div className="auth__wrapper">
          <div className="auth">
            <div className="auth__content">
              <div className="auth__title">Sign up to Summarist</div>
              {errorMessage && (
                <div className="auth__error">{errorMessage}</div>
              )}
              <button
                className="btn google__btn--wrapper"
                onClick={handleGoogleLogin}
                disabled={loadingType !== null}
              >
                <figure className="google__icon--mask">
                  <Image src={Google} alt="google" />
                </figure>
                {loadingType === "google" ? "Signing Up" : "Sign up with Google"}
              </button>
              <div className="auth__separator">
                <span className="auth__separator--text">or</span>
              </div>
              <form className="auth__main--form" onSubmit={handleEmailAuth}>
                <input
                  className="auth__main--input"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loadingType !== null}
                  required
                />
                <input
                  className="auth__main--input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loadingType !== null}
                  required
                />
                <button className="btn" >
                  {loadingType === "email" ? "Signing Up" : "Sign Up"}
                </button>
              </form>
            </div>
            <button
              className="auth__switch--btn"
              onClick={() => dispatch(setAuthModalView("login"))}
            >
              Already have an account?
            </button>
            <div className="auth__close--btn" onClick={closeModal}>
              <IoClose />
            </div>
          </div>
        </div>
      )}
    </>
  );
}


export default Modal