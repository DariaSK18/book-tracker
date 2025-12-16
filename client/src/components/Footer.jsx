import { useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCircleCheck,
  faChartSimple,
  faFolderOpen,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const location = useLocation();
  const svgColor = "#58c6c6ff";

  const bubbles = [
    { id: 1, path: "/", icon: faBook },
    { id: 2, path: "/collections", icon: faFolderOpen },
    { id: 3, path: "/upload-book", icon: faCirclePlus },
    { id: 4, path: "/statistic", icon: faCircleCheck },
    { id: 5, path: "/goals", icon: faChartSimple },
  ];
  const bubbleRefs = useRef([]);
  const setBubbleRef = (el) => {
    if (el && !bubbleRefs.current.includes(el)) {
      bubbleRefs.current.push(el);
    }
  };

  const defaultActive =
    bubbles.find((b) => b.path === location.pathname)?.id || 1;
  const [active, setActive] = useState(defaultActive);
  const [bgLeft, setBgLeft] = useState(0);

  //   useLayoutEffect(() => {
  //   const bubbleEl = bubbleRefs.current[defaultActive - 1];
  //   if (bubbleEl) {
  //     const left = bubbleEl.offsetLeft + bubbleEl.offsetWidth / 2 - 92;
  //     setBgLeft(left);
  //   }
  // }, [defaultActive]);

  useLayoutEffect(() => {
    const bubbleEl = bubbleRefs.current[active - 1];
    if (bubbleEl) {
      const left = bubbleEl.offsetLeft + bubbleEl.offsetWidth / 2 - 92;
      setBgLeft(left);
    }
  }, [active]);

  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__navigation">
          <div className="footer__nav-wrapper">
            {bubbles.map((b) => (
              <Link key={b.id} to={b.path}>
                <div
                  id={b.id}
                  ref={setBubbleRef}
                  className={`bubble ${active === b.id ? "active" : ""}`}
                  onClick={() => handleClick(b.id)}
                >
                  <span className="bubble__icon">
                    <FontAwesomeIcon icon={b.icon} />
                  </span>
                </div>
              </Link>
            ))}
            {active && (
              <div className="bgDrop" style={{ left: `${bgLeft}px` }}>
                <svg width="180" height="50" viewBox="0 0 196 62" fill="none">
                  <path
                    d="M0 0C0 0 9.7143 2.62616 16.0409 5.3913C40.726 16.1803 52.3868 45.5257 77.1969 56.6087C89.5682 62.1351 107.974 62.969 120.307 56.6087C143.731 44.5287 155.181 16.1256 179.458 5.3913C186.12 2.44566 196 0 196 0H0Z"
                    fill={svgColor}
                  />
                </svg>
              </div>
            )}
          </div>
        </nav>
      </div>
    </footer>
  );
}
