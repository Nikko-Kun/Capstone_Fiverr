import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CategoryDetail from "../pages/category/CategoryDetail";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import JobTypeDetail from "../pages/detail/JobTypeDetail";
import JobDetail from "../pages/detail/JobDetail";
import User from "../components/User";
import AdminLayout from "../layout/AdminLayout";
import ManageWork from "../components/admin/ManageWork";
import ManageService from "../components/admin/ManageService";
import ManageUser from "../components/admin/ManageUser";
import ManageTypeWork from "../components/admin/ManageTypeWork";
import Checkout from "../pages/Checkout";
import Success from "../pages/Success";

const Router = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "category/:id",
          element: <CategoryDetail />,
        },
        {
          path: "job-type/:id",
          element: <JobTypeDetail />,
        },
        {
          path: "job/:id",
          element: <JobDetail />,
        },
        {
          path: "checkout/:id",
          element: <Checkout />,
        },
        {
          path: "success",
          element: <Success />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "user",
          element : <User />
        }
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path : "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "manage-work",
          element: <ManageWork />,
        },
        {
          path: "manage-service",
          element: <ManageService />,
        },
        {
          path: "",
          element: <ManageUser />,
        },
        {
          path: "manage-type-work",
          element :<ManageTypeWork />
        }
      ],
    }
  ]);
  return elements;
};

export default Router;
