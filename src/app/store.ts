import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { goalsReducer } from "../features/goals/goalSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { currentQuoteReducer } from "../features/quotes/currentQuoteSlice"

// Standard RTK store configuration: map reducers explicitly. We use
// the quotesApiSlice reducer under its `reducerPath` so RTK Query works.
export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    currentQuote: currentQuoteReducer,
    [quotesApiSlice.reducerPath]: quotesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesApiSlice.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
