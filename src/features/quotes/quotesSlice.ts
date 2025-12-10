// src/features/quotes/quotesSlice.ts
// all Redux and API logic for quotes here
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface QuoteState {
  quote: string
  author: string
}

const initialState: QuoteState = {
  quote: "",
  author: "",
}

interface QuotePayload {
  quoteText: string
  quoteAuthor: string
}

// Redux slice for storing the current quote
export const currentQuoteSlice = createSlice({
  name: "currentQuote",
  initialState,
  reducers: {
    setQuote: (state, action: PayloadAction<QuotePayload>) => {
      state.quote = action.payload.quoteText
      state.author = action.payload.quoteAuthor
    },
    clearQuote: (state) => {
      state.quote = ""
      state.author = ""
    },
  },
})

export const { setQuote, clearQuote } = currentQuoteSlice.actions
export default currentQuoteSlice.reducer

// --- RTK Query API slice for fetching quotes ---
export type QuotableQuote = {
  _id: string
  content: string
  author: string
  authorSlug: string
  length: number
  tags: string[]
}

export type RandomQuoteParams = {
  limit?: number
  maxLength?: number
  minLength?: number
  tags?: string
  author?: string
}

export const quotesApi = createApi({
  reducerPath: "quotesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.quotable.io" }),
  tagTypes: ["Quotes"],
  endpoints: (build) => ({
    getRandomQuotes: build.query<QuotableQuote[], RandomQuoteParams>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams()
        if (params.limit) searchParams.append("limit", params.limit.toString())
        if (params.maxLength) searchParams.append("maxLength", params.maxLength.toString())
        if (params.minLength) searchParams.append("minLength", params.minLength.toString())
        if (params.tags) searchParams.append("tags", params.tags)
        if (params.author) searchParams.append("author", params.author)
        return `/quotes/random?${searchParams.toString()}`
      },
      providesTags: ["Quotes"],
    }),
  }),
})

export const {
  useGetRandomQuotesQuery,
  useLazyGetRandomQuotesQuery,
} = quotesApi
