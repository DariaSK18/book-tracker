import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Categories from "../pages/Categories";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChangePassword from "../pages/ChangePassword";
import Goals from "../pages/Goals";
import Statistic from "../pages/Statistic";
import Collections from "../pages/Collections";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/categories", element: <Categories /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/goals", element: <Goals /> },
      { path: "/statistic", element: <Statistic /> },
      { path: "/collections", element: <Collections /> },
    ],
  },
]);