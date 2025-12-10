// src/features/quotes/useFetchQuote.ts
import { useLazyGetRandomQuotesQuery } from "./quotesSlice"; // <- plural
import { useCallback } from "react";

export function useFetchQuote() {
  const [triggerQuoteFetch] = useLazyGetRandomQuotesQuery();

  const fetchQuote = useCallback(async () => {
    try {
      const result = await triggerQuoteFetch({ limit: 1 }).unwrap();
      return result[0]; // return the single quote
    } catch (err) {
      console.error("Failed to fetch quote", err);
      return null;
    }
  }, [triggerQuoteFetch]);

  return { fetchQuote };
}
