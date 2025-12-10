// src/features/quotes/QuoteDisplay.tsx
import type { JSX } from "react"
import { useAppSelector } from "../../app/hooks"
import styles from "./Quotes.module.css"

export const QuoteDisplay = (): JSX.Element | null => {
  const quote = useAppSelector((s) => s.currentQuote.quote)
  const author = useAppSelector((s) => s.currentQuote.author)

  if (!quote) return null

  return (
    <div className={styles.container}>
      <blockquote>
        &ldquo;{quote}&rdquo;
        <footer>
          <cite>{author}</cite>
        </footer>
      </blockquote>
    </div>
  )
}
