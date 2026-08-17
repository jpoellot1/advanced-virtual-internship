import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
    uid: string;
    email: string | null;
    subscriptionStatus: 'basic' | 'premium';
}

interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers :{
        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.isLoading = false;
        },
        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
})

export const {setUser, clearUser, setAuthLoading} = authSlice.actions;
export default authSlice.reducer;