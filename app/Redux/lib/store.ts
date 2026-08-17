import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/app/Redux/apiSlice'
import authModalReducer from '@/app/Redux/authModalSlice'
import authReducer from '@/app/Redux/authSlice'
import { sidebarSlice } from '../sidebarSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath] : apiSlice.reducer,
      authModal: authModalReducer,
      auth: authReducer,
      sidebar: sidebarSlice.reducer
    },
      middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']