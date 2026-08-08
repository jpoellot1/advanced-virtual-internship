import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthModalView = 'login' | 'register';

interface AuthModalState {
    isOpen: boolean;
    view: AuthModalView
}

const initialState: AuthModalState = {
    isOpen: false,
    view: 'login'
}

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        openAuthModal: (state, action: PayloadAction<AuthModalView | undefined>) => {
            state.isOpen = true;
            if(action.payload) {
                state.view = action.payload
            }
        },
        closeAuthModal: (state) => {
            state.isOpen = false
        },
        setAuthModalView: (state, action: PayloadAction<AuthModalView>) => {
            state.view = action.payload;
        }
    }
})

export const {openAuthModal, closeAuthModal, setAuthModalView} = authModalSlice.actions
export default authModalSlice.reducer