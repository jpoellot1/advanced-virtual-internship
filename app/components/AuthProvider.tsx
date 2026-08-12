'use client'
import React, {useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase.js'
import { useAppDispatch } from '../Redux/lib/hooks'
import { setUser, clearUser } from '../Redux/authSlice'

export default function AuthProvider({children}:{children: React.ReactNode}) { 
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) {
                dispatch (
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        isAnonymous: firebaseUser.isAnonymous,
                    })
                )
            }
            else {
                dispatch(clearUser())
            }
        })
        return () => unsubscribe()
    }, [dispatch])
    
  return (
    <>{children}</>
  )
}
