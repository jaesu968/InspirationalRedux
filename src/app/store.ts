import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Local reducers
import { goalsReducer } from "../features/goals/goalSlice";

// RTK Query API
import { quotesApi } from "../features/quotes/quotesSlice";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
