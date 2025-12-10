import { useGetRandomQuotesQuery } from "./quotesSlice";

export const QuoteDisplay = () => {
  const { data: quotes, isLoading, isError } = useGetRandomQuotesQuery({ limit: 1 });

  if (isLoading) return <p>Loading inspirational quote...</p>;
  if (isError) return <p style={{ color: "red" }}>Failed to load quote.</p>;
  if (!quotes || quotes.length === 0) return null;

  const quote = quotes[0];

  return (
    <figure style={{ margin: "20px", maxWidth: "600px", textAlign: "center" }}>
      <blockquote style={{ fontSize: "1.2em", fontStyle: "italic" }}>
        "{quote.content}"
      </blockquote>
      {quote.author && <figcaption style={{ textAlign: "right" }}>— {quote.author}</figcaption>}
    </figure>
  );
};
