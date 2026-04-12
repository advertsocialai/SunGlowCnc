import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface RFQ {
  id: string
  title: string
  material: string
  tolerance?: string
  quantity: number
  status: string
  priority: string
  fileUrl?: string
  fileName?: string
  notes?: string
  createdAt: string
  quote?: { amount: number; currency: string; validUntil: string }
}

interface RFQState {
  items: RFQ[]
  selectedRFQ: RFQ | null
  loading: boolean
  error: string | null
  submitting: boolean
}

const initialState: RFQState = {
  items: [],
  selectedRFQ: null,
  loading: false,
  error: null,
  submitting: false,
}

export const fetchRFQs = createAsyncThunk('rfq/fetchAll', async () => {
  const res = await fetch('/api/rfq')
  if (!res.ok) throw new Error('Failed to fetch RFQs')
  return res.json()
})

export const fetchRFQById = createAsyncThunk('rfq/fetchById', async (id: string) => {
  const res = await fetch(`/api/rfq/${id}`)
  if (!res.ok) throw new Error('Failed to fetch RFQ')
  return res.json()
})

export const createRFQ = createAsyncThunk('rfq/create', async (data: Partial<RFQ>) => {
  const res = await fetch('/api/rfq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create RFQ')
  return res.json()
})

const rfqSlice = createSlice({
  name: 'rfq',
  initialState,
  reducers: {
    clearError(state) { state.error = null },
    clearSelected(state) { state.selectedRFQ = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRFQs.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchRFQs.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchRFQs.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Error' })
      .addCase(fetchRFQById.pending, (state) => { state.loading = true })
      .addCase(fetchRFQById.fulfilled, (state, action) => { state.loading = false; state.selectedRFQ = action.payload })
      .addCase(fetchRFQById.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Error' })
      .addCase(createRFQ.pending, (state) => { state.submitting = true; state.error = null })
      .addCase(createRFQ.fulfilled, (state, action) => { state.submitting = false; state.items.unshift(action.payload) })
      .addCase(createRFQ.rejected, (state, action) => { state.submitting = false; state.error = action.error.message ?? 'Error' })
  },
})

export const { clearError, clearSelected } = rfqSlice.actions
export default rfqSlice.reducer
