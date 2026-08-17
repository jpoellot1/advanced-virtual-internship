import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthModalView = 'login' | 'register';

export interface OpenAuthModalPayload {
    view?: AuthModalView;
    redirectUrl?: string;
}

interface AuthModalState {
    isOpen: boolean;
    view: AuthModalView;
    redirectUrl: string | null;
}

const initialState: AuthModalState = {
    isOpen: false,
    view: 'login',
    redirectUrl: null,
}

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        openAuthModal: (state, action: PayloadAction<AuthModalView | OpenAuthModalPayload| undefined>) => {
            state.isOpen = true;
            if(typeof action.payload === 'string') {
                state.view = action.payload
                state.redirectUrl = null
            }
            else if (action.payload && typeof action.payload === 'object') {
                if(action.payload.view) {
                    state.view = action.payload.view
                }
                state.redirectUrl= action.payload.redirectUrl || null;
            }
        },
        closeAuthModal: (state) => {
            state.isOpen = false
            state.redirectUrl = null
        },
        setAuthModalView: (state, action: PayloadAction<AuthModalView>) => {
            state.view = action.payload;
        }
    }
})

export const {openAuthModal, closeAuthModal, setAuthModalView} = authModalSlice.actions
export default authModalSlice.reducer