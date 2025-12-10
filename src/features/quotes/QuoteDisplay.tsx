import type { JSX } from "react"
import { useAppSelector } from "../../app/hooks"
import styles from "./Quotes.module.css"

export const QuoteDisplay = (): JSX.Element | null => {
  const current = useAppSelector((s) => s.currentQuote?.current)
  const status = useAppSelector((s) => s.currentQuote?.status)

  if (status === "loading") return <div className={styles.container}><h3>Loading quote…</h3></div>
  if (!current) return null

  return (
    <div className={styles.container}>
      <blockquote>
        &ldquo;{current.quote}&rdquo;
        <footer>
          <cite>{current.author}</cite>
        </footer>
      </blockquote>
    </div>
  )
}

export default QuoteDisplay
