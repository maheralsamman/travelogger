import { configureStore } from '@reduxjs/toolkit'
import tripReducer from "./tripSlice"
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    trips: tripReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: true
})