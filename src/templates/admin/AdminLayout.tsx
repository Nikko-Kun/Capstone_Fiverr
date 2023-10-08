import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Navbar from "../../components/admin/Navbar";

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <>
      <HeaderAdmin />
      <div className="flex flex-wap bg-gray-100 w-full">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
