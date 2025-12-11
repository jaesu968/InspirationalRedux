import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { goalsReducer } from "../features/goals/goalSlice";
import { quotesApi } from "../features/quotes/quotesSlice";

const rootReducer = combineReducers({
  goals: goalsReducer,
  [quotesApi.reducerPath]: quotesApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(quotesApi.middleware),
    preloadedState: preloadedState as RootState | undefined,
  });
};

export const store = makeStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
