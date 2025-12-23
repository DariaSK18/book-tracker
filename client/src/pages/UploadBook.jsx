import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBook } from "../api/booksApi";

export default function UploadBook() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    numOfPages: "",
    collection: "",
    genre: "",
    readingStatus: "",
    pagesRead: null,
    image_url: "",
  });

  const readingStatusOptions = [
    { label: "Book I've read in the past", value: "done" },
    { label: "Book I'm currently reading", value: "now" },
    { label: "Book I'm going to read", value: "will" },
  ];

  const handleStarClick = (star) => {
  setRating((prev) => (prev === star ? 0 : star));
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookData((prev) => {
      if (name === "readingStatus") {
        if (value === "done") {
          return {
            ...prev,
            readingStatus: value,
            pagesRead: Number(prev.numOfPages) || 0,
          };
        }

        if (value === "will") {
          setRating(0);
          return {
            ...prev,
            readingStatus: value,
            pagesRead: 0,
          };
        }
      }
      if (name === "numOfPages" && prev.readingStatus === "done") {
        return {
          ...prev,
          numOfPages: value,
          pagesRead: Number(value) || 0,
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        description: bookData.description.trim(),
        pages_total: Number(bookData.numOfPages) || 0,
        pages_read: Number(bookData.pagesRead) || 0,
        reading_status: bookData.readingStatus,
        // rating: bookData.readingStatus === "done" ? rating : 0,
        collection: bookData.collection.trim(),
        genre: bookData.genre.trim(),
        image_url: bookData.image_url.trim(),
      };
      if (bookData.readingStatus === "done" && rating > 0) {
  payload.rating = rating;
}

      await createBook(payload);
      toast.success("Book added successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  return (
    <div>
      {/* <h4>Add Book</h4> */}

      <form onSubmit={handleSubmit} className="book-form">
        <div className="top-btns">
          <button type="button">Search Online</button>
          <button type="button">Scan ISBN code</button>
        </div>
        <p>or add manually</p>
        <div className="form-grid">
          <div className="form-inputs">
            <input
              type="text"
              placeholder="Book title *"
              name="title"
              value={bookData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Book author *"
              name="author"
              value={bookData.author}
              onChange={handleChange}
            />
            <textarea
              placeholder="Description *"
              name="description"
              value={bookData.description}
              onChange={handleChange}
              rows={4}
              style={{ resize: "vertical" }}
            />
            <input
              type="number"
              placeholder="Number of pages *"
              name="numOfPages"
              value={bookData.numOfPages}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Collection"
              name="collection"
              value={bookData.collection}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
            />
          </div>

          <div className="form-extra">
            <div className="radio-group">
              {readingStatusOptions.map((option) => (
                <label className="radio" key={option.value}>
                  <input
                    type="radio"
                    name="readingStatus"
                    value={option.value}
                    checked={bookData.readingStatus === option.value}
                    onChange={handleChange}
                  />
                  <span className="custom-radio"></span>
                  <span className="radio-label">{option.label}</span>
                </label>
              ))}
              {bookData.readingStatus === "now" && (
               <>
                  {/* <small>You can update progress later</small> */}
                  <input
                    type="number"
                    placeholder="Pages read"
                    name="pagesRead"
                    value={bookData.pagesRead ?? ""}
                    min={0}
                    max={bookData.numOfPages}
                    onChange={handleChange}
                  />
               </>
              )}
              {bookData.readingStatus === "done" && (
                <>
                  {/* <small>Book marked as finished — pages filled automatically</small> */}
                  <div className="rating-input">
                    <p>Rate this book</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleStarClick(star)}
                        style={{
                          cursor: "pointer",
                          color: star <= rating ? "#f5b301" : "#ccc",
                          fontSize: "24px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="form-extra__img">
              <input
                name="image_url"
                type="url"
                placeholder="Image URL"
                value={bookData.image_url}
                onChange={handleChange}
              />
              {bookData.image_url && (
                <img
                  src={bookData.image_url}
                  alt="Preview"
                  style={{ maxWidth: "400px" }}
                />
              )}
            </div>
          </div>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
