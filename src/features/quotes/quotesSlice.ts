// src/features/quotes/quotesSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import quotesData from "./quotes.json"; // import local JSON

export type QuotableQuote = {
  content: string;
  author: string;
};

export const quotesApi = createApi({
  reducerPath: "quotesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // baseUrl is local
  endpoints: (build) => ({
    getRandomQuotes: build.query<QuotableQuote[], void>({
      queryFn: async () => {
        if (!quotesData || quotesData.length === 0) return { data: [] };
        const randomIndex = Math.floor(Math.random() * quotesData.length);
        const selectedQuote = quotesData[randomIndex];
        return { data: [selectedQuote] };
      }
    }),
  }),
});

export const { useGetRandomQuotesQuery, useLazyGetRandomQuotesQuery } = quotesApi;
