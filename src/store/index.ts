import { configureStore } from '@reduxjs/toolkit'
import rfqReducer from './slices/rfqSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    rfq: rfqReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
