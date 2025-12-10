// src/features/quotes/useFetchQuote.ts
import { useAppDispatch } from "../../app/hooks"
import { setQuote } from "./quotesSlice"
import { useLazyGetRandomQuotesQuery } from "./quotesSlice"

export function useFetchQuote() {
  const dispatch = useAppDispatch()
  const [triggerQuoteFetch] = useLazyGetRandomQuotesQuery()

  const fetchQuote = async () => {
    try {
      const result = await triggerQuoteFetch({ limit: 1 })
      if (result.data && result.data.length > 0) {
        dispatch(
          setQuote({
            quoteText: result.data[0].content,
            quoteAuthor: result.data[0].author,
          })
        )
      }
    } catch (err) {
      console.error("Failed to fetch random quote", err)
    }
  }

  return { fetchQuote }
}
