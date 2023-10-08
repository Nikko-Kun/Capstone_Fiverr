import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/config-store";
import { layDanhSachCongViec } from "../../redux/quanLyCongViec/thunkAction";
import { NavLink, useParams } from "react-router-dom";

const JobTypeDetail = () => {
  const params = useParams();
  const id: number = parseInt(params.id as string);
  const { danhSachCongViec } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(layDanhSachCongViec());
  }, [dispatch]);

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <div className="container mx-auto pt-40">
      <h1 className="text-font-32 font-bold mb-8">Job list</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {danhSachCongViec
          ?.filter((item) => item.maChiTietLoaiCongViec === id)
          .map((i) => (
            <NavLink key={i.id} to={`/job/${i.id}`} className="group">
              <img src={i.hinhAnh} className="rounded-lg" alt="" />
              <p className="my-4 text-font-20 font-semibold group-hover:underline">
                {i.tenCongViec}
              </p>
              <i className="fa-solid fa-star"></i>
              <span className="text-font-20 font-bold">
                {i.saoCongViec} ({i.danhGia})
              </span>
              <p className="my-4 text-font-20 font-bold">From US${i.giaTien}</p>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default JobTypeDetail;
