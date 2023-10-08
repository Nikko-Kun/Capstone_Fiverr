import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/config-store";
import UserInfor from "./UserInfor";
import clsx from "clsx";
import { uploadAvatar } from "../redux/quanLyAuth/thunkAction";

type Props = {};

const Profile = (props: Props) => {
  const { auth } = useSelector((state: RootState) => state.quanLyAuth);
  const [showUserInfor, setShowUserInfor] = useState(false);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("formFile", file);
        dispatch(uploadAvatar(formData));
        alert("Update avatar successfully");
      }
    } catch (error) {
      alert("Update avatar failed");
    }
  };
  if (auth !== undefined) {
    return (
      <div className="profile">
        <div className="profile-content">
          <div className="content-top">
            <img
              src={auth.user.avatar}
              alt={auth.user.name}
              className="w-36 h-36 mx-auto my-6 rounded-full"
            />
            <input type="file" name="profile[image]" onChange={handleChange} />
            <div className="flex gap-6">
              <p>
                <i className="fa-regular fa-user"></i> {auth.user.name}
              </p>
              <button
                onClick={() => {
                  setShowUserInfor(!showUserInfor);
                }}
              >
                <i className="fa-solid fa-pencil"></i>
                Edit Profile
              </button>
            </div>
          </div>
          <div
            className={clsx("content-bottom", {
              hidden: !showUserInfor,
            })}
          >
            <UserInfor />
          </div>
        </div>
        <div></div>
      </div>
    );
  }
  return <></>;
};

export default Profile;
