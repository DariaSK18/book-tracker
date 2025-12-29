import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import LiquidEther from '../component/LiquidEther';
// import "../App.css"
import { useAlert } from "../context/AlertContext";
import Alert from "../components/Alert";

export default function MainLayout() {
    const { alert, clearAlert } = useAlert();

  return (
    <div className="wrapper">
      <Header />
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
          fixed
        />
      )}
      <main className="main">
        <div className="main__container">
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  );
}
