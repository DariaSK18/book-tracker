import { useState, useEffect } from "react";
import { getAllBooks } from "../api/booksApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import BookActions from "../components/BookActions";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(books);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await getAllBooks();
        setBooks(res.data.books);
        // console.log(books.data);
      } catch (err) {
        console.error("Failed to load books:", err);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="home">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2.4}
        initialSlide={0}
        speed={1000}
        parallax={true}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        coverflowEffect={{
          rotate: -5,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <img
              src={book.image_url || "/images/no_cover_available.png"}
              alt={book.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="home__books">
        {books[activeIndex] && (
          <div className="home__content book" key={books[activeIndex].id}>
            <div className="book__status status">
              <span className="status__title">
                {books[activeIndex].reading_status}
              </span>
              <span className="status__pages">
                {books[activeIndex].pages_read}/{books[activeIndex].pages_total}
              </span>
            </div>
            <div className="book__info">
              <h3 className="book__title">{books[activeIndex].title}</h3>
              <p className="book__author">by {books[activeIndex].author}</p>
              <p className="book__genre">{books[activeIndex].genre}</p>
              <p className="book__collection">
                {books[activeIndex].collection}
              </p>
            </div>
            <BookActions className="book__actions actions" book={books[activeIndex]} />
          </div>
        )}
      </div>
    </div>
  );
}
