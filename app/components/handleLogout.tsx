'use client'
import { signOut } from 'firebase/auth'
import {auth} from "@/firebase"
import { useAppDispatch } from '../Redux/lib/hooks'
import { clearUser } from '../Redux/authSlice'

export function useHandleLogout() {
    const dispatch = useAppDispatch();

    const logout = async() => {
        try {
            await signOut(auth)
            dispatch(clearUser())
        } catch(error) {
            console.error('Error signing out', error)
        }

    }

  return logout
}
