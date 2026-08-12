import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/app/Redux/apiSlice'
import authModalReducer from '@/app/Redux/authModalSlice'
import authReducer from '@/app/Redux/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath] : apiSlice.reducer,
      authModal: authModalReducer,
      auth: authReducer
    },
      middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']