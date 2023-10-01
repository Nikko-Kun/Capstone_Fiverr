import React from "react";
import { NavLink } from "react-router-dom";

const Success = () => {
  return (
    <div className="container mx-auto pt-40 text-center">
      <h1 className="text-font-48 font-bold">
        Hire a job successfully
      </h1>
      <NavLink to="/" className="hover:underline">Back to home</NavLink>
    </div>
  );
};

export default Success;
