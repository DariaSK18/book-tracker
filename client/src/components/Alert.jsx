import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function Alert({ type = "error", message, onClose, fixed = false, duration = 3000 }) {
  const alertClasses = `alert alert-${type}${fixed ? " alert-fixed" : ""}`;

  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
  };

  useEffect(() => {
    if (!onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={alertClasses}>
      <FontAwesomeIcon icon={icons[type]} className="alert-icon" />
      <span className="alert-message">{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
}