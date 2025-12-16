import Button from "../components/Button";
import Rating from "../components/Rating";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck} from "@fortawesome/free-solid-svg-icons";

export default function BookActions({ book }) {
  if (!book) return null;

  const handleShare = () => console.log("Share", book.title);
  const handleContinueReading = () => console.log("Continue", book.title);
  const handleStartReading = () => console.log("Start", book.title);
  const handleMarkDone = () => console.log("Done", book.title);

  switch (book.reading_status) {
    case "done":
      return (
        <div className="actions__done">
          <div>
            {/* Rating: {book.rating || "–"} */}
            <Rating rating={book.rating} />
          </div>
          <Button
            text={"Share"}
            onClick={handleShare}
            className={"action-btn"}
          />
        </div>
      );

    case "now":
      return (
        <div className="actions__now">
          <Button
            text={"Continue Reading"}
            onClick={handleContinueReading}
            className={"action-btn"}
          />
          <Button
            text={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleMarkDone}
            className={"action-btn icon-done"}
          />
        </div>
      );

    case "will":
      return (
        <div className="actions__will">
          <Button
            text={"Start Reading"}
            onClick={handleStartReading}
            className={"action-btn"}
          />
          <Button
            text={<FontAwesomeIcon icon={faCheck} />}
            onClick={handleMarkDone}
            className={"action-btn icon-done"}
          />
        </div>
      );

    default:
      return null;
  }
}
