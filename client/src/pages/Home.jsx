import { useState, useEffect } from "react";
import { getAllBooks } from "../api/booksApi";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home() {
  const [books, setBooks] = useState([]);
  // const [activeIndex, setActiveIndex] = useState(0);
  // console.log(books);

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
        coverflowEffect={{
          rotate: -5,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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
    </div>
  );
}
