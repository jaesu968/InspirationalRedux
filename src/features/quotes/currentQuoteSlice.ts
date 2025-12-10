import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type Quote = {
  id: number
  quote: string
  author: string
}

type CurrentQuoteState = {
  current?: Quote
  status: "idle" | "loading" | "succeeded" | "failed"
  error?: string
}

const initialState: CurrentQuoteState = {
  current: undefined,
  status: "idle",
  error: undefined,
}

// Fetch a small batch of quotes and pick one at random
export const fetchRandomQuote = createAsyncThunk<Quote, void, { rejectValue: string }>(
  "quotes/fetchRandomQuote",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://dummyjson.com/quotes?limit=10")
      if (!res.ok) return rejectWithValue(`HTTP ${res.status}`)
      const data = await res.json()
      const quotes: Quote[] = data.quotes ?? []
      if (!quotes.length) return rejectWithValue("no quotes returned")
      const random = quotes[Math.floor(Math.random() * quotes.length)]
      return random
    } catch (err) {
      return rejectWithValue(String(err))
    }
  }
)

const slice = createSlice({
  name: "currentQuote",
  initialState,
  reducers: {
    clearQuote(state) {
      state.current = undefined
      state.status = "idle"
      state.error = undefined
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRandomQuote.pending, state => {
        state.status = "loading"
        state.error = undefined
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.current = action.payload
        state.error = undefined
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload as string
      })
  },
})

export const { clearQuote } = slice.actions
export const currentQuoteReducer = slice.reducer
export type { Quote }
export default slice
