import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../templates/footer/Footer";
import Header from "../templates/header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
