import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/config-store";
import { useSelector } from "react-redux";
import { getHireWorkOfUser } from "../redux/quanLyCongViec/thunkAction";
import { HireWorkOfUserResponse } from "../react-app-env";

type Props = {};

const Order = (props: Props) => {
  const dispatch = useAppDispatch();
  const { listHireWorkOfUser } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  useEffect(() => {
    dispatch(getHireWorkOfUser());
  }, [dispatch]);

  const renderTable = () => {
    if (listHireWorkOfUser) {
      return listHireWorkOfUser.map((value: HireWorkOfUserResponse) => {
        return (
          <tr
            className="text-xs bg-blue-50 border-b border-gray-100"
            key={value.id}
          >
            <td className=" py-6 bg-blue-100 whitespace-pre-wrap">
              {value.congViec.tenCongViec}
            </td>
            <td className="">
              <img
                src={value.congViec.hinhAnh}
                className="w-[50px] h-[50px"
                alt=""
              />
            </td>
            <td>${value.congViec.giaTien}</td>
            <td>{value.congViec.danhGia}</td>
            <td>{value.congViec.saoCongViec}</td>
            <td>{value.hoanThanh ? "Completed" : "Working"}</td>
          </tr>
        );
      });
    }
    return "";
  };

  return (
    <section className="bg-gray-50 py-8 px-4">
      <table className="table-auto w-full bg-white shadow rounded text-center">
        <thead className="border-b border-gray-100 text-center">
          <tr>
            <th className=" py-6">
              <div className=" text-xs text-gray-500 tex">
                <p>Name Work</p>
              </div>
            </th>
            <th>
              <div className=" text-xs text-gray-500">
                <p>Image</p>
              </div>
            </th>
            <th>
              <div className=" text-xs text-gray-500">
                <p>Price</p>
              </div>
            </th>
            <th>
              <div className=" text-xs text-gray-500">
                <p>Star</p>
              </div>
            </th>
            <th>
              <div className=" text-xs text-gray-500">
                <p>Date Hire</p>
              </div>
            </th>
            <th>
              <div className=" text-xs text-gray-500">
                <p>Status</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
          {/* <tr className="text-xs bg-blue-50 border-b border-gray-100">
            <td className=" py-6 bg-blue-100">Ashton Cox</td>
            <td className="">Technical Author</td>
            <td>San Francisco</td>
            <td>66</td>
            <td>22/04/2021</td>
            <td>$4,800</td>
          </tr> */}
        </tbody>
      </table>
    </section>
  );
};

export default Order;
