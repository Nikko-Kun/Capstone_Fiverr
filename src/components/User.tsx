import React, { useEffect } from "react";
import Profile from "./Profile";
import NoItem from "./NoItem";
import Order from "./Order";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { getHireWorkOfUser } from "../store/quanLyCongViec/thunkAction";

type Props = {};

const User = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useAppDispatch();
  const { listHireWorkOfUser } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  useEffect(() => {
    dispatch(getHireWorkOfUser());
  }, [dispatch]);

  return (
    <div className="user-tab">
      <div className="tab-content">
        <div className="user-profile">
          <Profile />
        </div>
        <div className="user-order">
          {listHireWorkOfUser ? (
            listHireWorkOfUser?.length > 0 ? (
              <Order />
            ) : (
              <NoItem />
            )
          ) : (
            <NoItem />
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
