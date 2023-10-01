import React, { useEffect } from "react";
import { GetCongViecResponse } from "../react-app-env";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { layDanhSachCongViec } from "../store/quanLyCongViec/thunkAction";
import CongViecCard from "../components/CongViecCard";

const CongViecList = () => {
  const { danhSachCongViec } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(layDanhSachCongViec());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {danhSachCongViec?.map((congViec: GetCongViecResponse) => (
        <CongViecCard key={congViec.id} congViec={congViec} />
      ))}
    </div>
  );
};

export default CongViecList;
