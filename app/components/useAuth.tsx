'use client'
import { useAppSelector, useAppDispatch } from "../Redux/lib/hooks"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth" 
import { onSnapshot, doc } from "firebase/firestore"
import { auth, db } from "@/firebase"
import { setUser, clearUser, setAuthLoading } from "../Redux/authSlice"


export function useAuth() {
  const dispatch = useAppDispatch()
  const {user, isLoading} = useAppSelector((state) => state.auth)
  
  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null=null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        dispatch(setAuthLoading(true))
        const userDocRef = doc(db, 'users', currentUser.uid)

        unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          const data = docSnap.data()
          const status = (data?.subscriptionStatus as 'basic' | 'premium') || 'basic'

          dispatch(setUser ({
            uid: currentUser.uid,
            email: currentUser.email,
            subscriptionStatus: status,
          }))
        }, (error) => {
          console.error("Error reading Firestore doc", error);
          dispatch(setUser ({
            uid: currentUser.uid,
            email: currentUser.email,
            subscriptionStatus: 'basic',
          }))
        })
      } else {
        if(unsubscribeSnapshot) {
          unsubscribeSnapshot();
          unsubscribeSnapshot = null;
        }
        dispatch(clearUser())
      }
    })
    return () => {
      unsubscribeAuth();
      if(unsubscribeSnapshot){
        unsubscribeSnapshot()
      }
    }
  }, [dispatch])

  return {
    user,
    isLoading,
    subscriptionStatus: user?.subscriptionStatus || 'basic',
    isPremium: user?.subscriptionStatus === 'premium',
    isBasic: user?.subscriptionStatus === 'basic'
  }
}
