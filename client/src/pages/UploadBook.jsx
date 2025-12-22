import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBook } from "../api/booksApi";

export default function UploadBook() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    numOfPages: "",
    collection: "",
    genre: "",
    readingStatus: "",
    // image: null,
    // urlImg: null,
    image_url: "",
  });

  const readingStatusOptions = [
    { label: "Book I've read in the past", value: "done" },
    { label: "Book I'm currently reading", value: "now" },
    { label: "Book I'm going to read", value: "will" },
  ];

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setBookData((prev) => ({
  //       ...prev,
  //       image: file,
  //       urlImg: URL.createObjectURL(file),
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        pages_total: Number(bookData.numOfPages) || 0,
        collection: bookData.collection,
        genre: bookData.genre,
        reading_status: bookData.readingStatus,
        image_url: bookData.image_url,
      };

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
            {/* <div className="radio-group">
              {readingStatusOptions.map((option) => (
                <label
                  key={option.value}>
                  <input
                    type="radio"
                    name="readingStatus"
                    value={option.value}
                    checked={bookData.readingStatus === option.value}
                    onChange={handleChange}
                  />{" "}
                  <span className="custom-radio"></span>
      <span className="radio-label">{option.label}</span>
                </label>
              ))}
            </div> */}
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
            </div>
            <div className="form-extra__img">
              {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
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
              {/* {bookData.urlImg && (
                <img
                  src={bookData.urlImg}
                  alt="Preview"
                  style={{ maxWidth: "400px" }}
                />
              )} */}
            </div>
          </div>
        </div>

        <button type="submit">Add Book</button>
      </form>

      {/* <pre>{JSON.stringify(bookData, null, 2)}</pre> */}
    </div>
  );
}
