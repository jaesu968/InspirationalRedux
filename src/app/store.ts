import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Local reducers
import { goalsReducer } from "../features/goals/goalSlice";
import currentQuoteReducer from "../features/quotes/quotesSlice";

// RTK Query API
import { quotesApi } from "../features/quotes/quotesSlice"; // <-- fix name

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    currentQuote: currentQuoteReducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
