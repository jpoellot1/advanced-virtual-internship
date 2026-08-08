import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/app/Redux/apiSlice'
import authModalReducer from '@/app/Redux/authModalSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath] : apiSlice.reducer,
      authModal: authModalReducer
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