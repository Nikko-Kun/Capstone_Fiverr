import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/config-store";
import { quanLyAuthActions } from "../../redux/quanLyAuth/slice";
import { useDispatch } from "react-redux";

type Props = {};

const HeaderAdmin = (props: Props) => {
  const [showSetting, setShowSetting] = useState(false);
  const { auth } = useSelector((state: RootState) => state.quanLyAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (auth?.user.role.toLowerCase() === "admin") {
    return (
      <div className="flex items-center space-x-4 p-2 mb-5 absolute w-[100%] top-[15px] right-[30px] justify-end bg">
        <div
          className="flex items-center space-x-4 p-2 mb-5 rounded-lg border border-color-white-light cursor-pointer bg-color-white"
          onClick={() => {
            setShowSetting(!showSetting);
          }}
        >
          <img
            className="h-12 rounded-full"
            src={auth.user.avatar}
            alt={auth.user.name}
          />
          <div>
            <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
              {auth.user.name}
            </h4>
            <span className="text-sm tracking-wide flex items-center space-x-1">
              <svg
                className="h-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-gray-600">{auth.user.role}</span>
            </span>
          </div>
        </div>
        <div
          className={clsx({
            "absolute top-[66%] right-0 shadow-lg shadow-color-white-light rounded-lg z-[100] bg-color-white":
              showSetting,
            hidden: !showSetting,
          })}
          onMouseLeave={() => {
            setShowSetting(!showSetting);
          }}
        >
          <ul className="space-y-2 text-sm p-3">
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <span>Change password</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                dispatch(quanLyAuthActions.dangXuat());
                navigate("/login");
              }}
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline cursor-pointer"
            >
              <span className="text-gray-600">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <NavLink to={"/"}></NavLink>;
};

export default HeaderAdmin;
