import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  toastMessage: string | null
  toastType: 'success' | 'error' | 'info' | null
}

const initialState: UIState = {
  sidebarOpen: true,
  toastMessage: null,
  toastType: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) { state.sidebarOpen = !state.sidebarOpen },
    setSidebarOpen(state, action: PayloadAction<boolean>) { state.sidebarOpen = action.payload },
    showToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) {
      state.toastMessage = action.payload.message
      state.toastType = action.payload.type
    },
    clearToast(state) { state.toastMessage = null; state.toastType = null },
  },
})

export const { toggleSidebar, setSidebarOpen, showToast, clearToast } = uiSlice.actions
export default uiSlice.reducer
