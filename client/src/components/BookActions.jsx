export default function BookActions({ book }) {
  if (!book) return null;

  const handleShare = () => console.log("Share", book.title);
  const handleContinueReading = () => console.log("Continue", book.title);
  const handleStartReading = () => console.log("Start", book.title);
  const handleMarkDone = () => console.log("Done", book.title);

  switch (book.reading_status) {
    case "done":
      return (
        <div className="book-actions">
          <p>Rating: {book.rating || "–"}</p>
          <button onClick={handleShare}>Share</button>
        </div>
      );

    case "now":
      return (
        <div className="book-actions">
          <button onClick={handleContinueReading}>Continue Reading</button>
          <button onClick={handleMarkDone}>Done</button>
        </div>
      );

    case "will":
      return (
        <div className="book-actions">
          <button onClick={handleStartReading}>Start Reading</button>
          <button onClick={handleMarkDone}>Done</button>
        </div>
      );

    default:
      return null;
  }
}
