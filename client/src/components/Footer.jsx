import { Link } from "react-router-dom";
import gsap from "gsap"; 
import "./footer.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCircleCheck, faChartSimple, faFolderOpen, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import { faTwitter } from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
// function getPositionPercent(index) {
//   const buttons = 5;
//   const percent = (100 / (buttons + 1)) * index;
//   return percent + "%";
// }

 function getPositionPercent(index) {
    const menu = document.getElementById(`menu${index}`);
    const container = document.getElementById("navbarContainer");
    const bubble = document.getElementById("bgBubble");

    // if (!menu || !container) {
    //   const fallback = container ? container.clientWidth / 2 : window.innerWidth / 2;
    //   return `${Math.round(fallback)}px`;
    // }
    if (!menu || !container || !bubble) return "0px";

    const menuRect = menu.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centerX = menuRect.left + menuRect.width / 2 - containerRect.left;
    const bubbleOffset = bubble.offsetWidth / 2;
    // return `${Math.round(centerX)}px`;
    return `${Math.round(centerX - bubbleOffset)}px`;
  }


function move(id, position, color) {
    var tl = gsap.timeline();
    tl.to("#bgBubble", {duration: 0.15, bottom: "-30px", ease: "ease-out"}, 0)
      .to("#bubble1", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
      .to("#bubble2", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
      .to("#bubble3", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
      .to("#bubble4", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
      .to("#bubble5", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
      .to(".icon", {duration: 0.05, opacity: 0, ease: "ease-out",}, 0)
      .to("#bgBubble", {duration: 0.2, left: position, ease: "ease-in-out"}, 0.1)
      .to("#bgBubble", {duration: 0.15, bottom: "-50px", ease: "ease-out"}, '-=0.2')
      .to(`#bubble${id}`, {duration: 0.15, y: "0%", opacity: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', ease: "ease-out"}, '-=0.1')
      .to(`#bubble${id}> span`, {duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out"}, '-=0.1')
      .to("body", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
      .to("#bg", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
      .to("#bgBubble", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
  }

  return (
    // <footer className="footer">
    //   <div className="footer__container"><Link to="/">My Books</Link> | <Link to="/goals">Goals</Link> | <Link to="/statistic">Stats</Link> | <Link to="/categories">Categories</Link> | <Link to="/collections">Collections</Link></div>
    // </footer>
    

    <footer >
<div id="navbarContainer">
  <div id="navbar">
    <div id="bubbleWrapper">
      <div id="bubble1" className="bubble"><span className="icon"><Link to="/"><FontAwesomeIcon icon={faBook} /></Link> </span></div>
      
      <div id="bubble2" className="bubble"><span className="icon"> <Link to="/categories"><FontAwesomeIcon icon={faFolderOpen} /></Link> </span></div>
      <div id="bubble3" className="bubble"><span className="icon"> <Link to="/upload-book"><FontAwesomeIcon icon={faCirclePlus} /></Link> </span></div>
      <div id="bubble4" className="bubble"><span className="icon"> <Link to="/statistic"><FontAwesomeIcon icon={faCircleCheck} /></Link> </span></div>
      <div id="bubble5" className="bubble"><span className="icon"><Link to="/goals"><FontAwesomeIcon icon={faChartSimple} /></Link> </span></div>
      
       
    </div>
    <div id="menuWrapper">
      <div id="menu1" className="menuElement" onClick={() => move('1', getPositionPercent(1), '#fddaa5ff')}><FontAwesomeIcon icon={faBook} /></div>
      
      <div id="menu2" className="menuElement" onClick={() => move('2', getPositionPercent(2), '#ce93d8')}><Link to="/categories"><FontAwesomeIcon icon={faFolderOpen} /></Link> </div>
      <div id="menu3" className="menuElement" onClick={() => move('3', getPositionPercent(3), '#93d8a5ff')}><Link to="/upload-book"><FontAwesomeIcon icon={faCirclePlus} /></Link> </div>
      <div id="menu4" className="menuElement" onClick={() => move('4', getPositionPercent(4), '#81d4fa')}><Link to="/goals"><FontAwesomeIcon icon={faCircleCheck} /></Link> </div>
      <div id="menu5" className="menuElement" onClick={() => move('5', getPositionPercent(5), '#c5e1a5')}><Link to="/statistic"><FontAwesomeIcon icon={faChartSimple} /></Link> </div>
      
      
    </div>
  </div>
  <div id="bgWrapper">
    <div id="bg"></div>
    <div id="bgBubble"></div>
  </div>
</div>

  <svg width="0" height="0" >
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter"/>
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
      </filter>
    </defs>
  </svg>

</footer>
  );
}
