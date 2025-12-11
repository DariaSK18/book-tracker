import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import { useAlert } from "../context/AlertContext";
// import Alert from "../components/Alert";
// import LiquidEther from '../component/LiquidEther';
// import "../App.css"

export default function MainLayout() {
//   const { alert, clearAlert } = useAlert();

  return (
    <div className="wrapper">
      {/* <div className="bg-st" style={{ width: '100%', height: 600, position: 'relative' }}>
  <LiquidEther
    colors={[ '#29ff4c', '#a0ff9e', '#f0eaa3' ]}
    mouseForce={10}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={32}
    iterationsPoisson={32}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  /></div> */}

      <Header />
      {/* {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
          fixed
        />
      )} */}
      <main className="main">
        <div className="main__container"><Outlet /></div>
      </main>
      <Footer />
      </div>
    
  );
}