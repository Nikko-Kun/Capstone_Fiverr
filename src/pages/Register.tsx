import React, { useEffect } from "react";
import { GetAuthResponse } from "../react-app-env";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { quanLyAuthService } from "../services/quanLyAuth.service";

const Register = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetAuthResponse>();
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center font-bold p-8">Register</h1>
      <form
        onSubmit={handleSubmit(async (value) => {
          try {
            const res = await quanLyAuthService.dangKy(value);
            if (res.data.statusCode !== 400) {
              alert("Sign up success");
              navigate("/login");
            }
          } catch (error) {
            alert("Account is existed");
          }
        })}
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            {...register("name", {
              required: "Please enter your name",
            })}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Please enter your email",
            })}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone
          </label>
          <input
            {...register("phone", {
              required: "Please enter your phone",
            })}
            type="number"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500">{errors.phone?.message}</p>
        </div>
        <div className="mb-6">
          <label
            htmlFor="birthday"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Birthday
          </label>
          <input
            {...register("birthday", {
              required: "Please enter your birthday",
            })}
            type="text"
            id="birthday"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500">{errors.birthday?.message}</p>
        </div>
        <div className="flex items-center mb-4">
          <label
            htmlFor="gender"
            className="mr-4 text-sm font-medium text-gray-900"
          >
            Gender
          </label>
          <input
            {...register("gender")}
            id="gender"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <span>Have an account?</span>{" "}
          <NavLink to="/login" className="text-color-green hover:underline">
            Sign in
          </NavLink>
        </div>
        <button
          type="submit"
          className="text-color-white bg-color-green hover:bg-color-green-light font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit
        </button>
        <NavLink
          to="/"
          className="text-color-white bg-color-green hover:bg-color-green-light font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Back to home
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
