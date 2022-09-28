import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    auth: authReducer,
  },
})

export default store