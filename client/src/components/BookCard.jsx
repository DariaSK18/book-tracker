import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faCircleXmark as faCircleXmarkSolid,
  faXmark,
  // faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  // faCircleXmark as faCircleXmarkReg,
  faHeart as faHeartReg,
} from "@fortawesome/free-regular-svg-icons";

export default function BookCard({ data, onDelete }) {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(data.id);
  };
  // console.log("---data", data);

  return (
    <div className="book-card">
      {/* {data} */}
      {/* <FontAwesomeIcon icon={faCircleXmarkSolid} />
      <FontAwesomeIcon icon={faCircleXmarkReg} /> */}
     <div className="book-card__btn-wrapper"> <FontAwesomeIcon className="book-card__btn-del" icon={faXmark} onClick={handleDeleteClick}/></div>

      {/* <FontAwesomeIcon icon={faHeartSolid} /> */}
      <div className="book-card__image">
        <img src={data.image_url} alt={data.title} />
      </div>
      <div className="book-card__text">
        <h3 className="book-card__title">{data.title}</h3>
        <p className="book-card__author">by {data.author}</p>
        <FontAwesomeIcon className="book-card__btn-like" icon={faHeartReg} />
      </div>
    </div>
  );
}
