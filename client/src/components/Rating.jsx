import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";

export default function Rating({ rating }) {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < rating ? faStarSolid : faStarReg}
          className="star"
        />
      ))}
    </div>
  );
}