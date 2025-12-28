import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Categories from "../pages/Categories";
import Login from "../components/Login";
import Register from "../components/Register";
import ChangePassword from "../pages/ChangePassword";
import Goals from "../pages/Goals";
import Statistic from "../pages/Statistic";
import Collections from "../pages/Collections";
import UploadBook from "../pages/UploadBook";
import AuthPage from "../pages/AuthPage";
import CollectionBooks from "../pages/CollectionBooks";
import SingleBook from "../pages/SingleBook";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/auth", element: <AuthPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/goals", element: <Goals /> },
          { path: "/statistic", element: <Statistic /> },
          { path: "/collections", element: <Collections /> },
          { path: "/upload-book", element: <UploadBook /> },
          { path: "/collection/:slug", element: <CollectionBooks /> },
          { path: "/single-book/:id", element: <SingleBook /> },
          { path: "/profile", element: <Profile /> },
          // { path: "/categories", element: <Categories /> },
          { path: "/change-password", element: <ChangePassword /> },
        ],
      },
    ],
  },
]);
