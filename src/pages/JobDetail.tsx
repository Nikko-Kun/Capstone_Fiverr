import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { layChiTietCongViec } from "../store/quanLyCongViec/thunkAction";
import { layBinhLuanTheoCongViec } from "../store/quanLyBinhLuan/thunkAction";
import { useForm } from "react-hook-form";
import { AddBinhLuanResponse } from "../react-app-env";
import { quanLyBinhLuanService } from "../services/quanLyBinhLuan.service";

const JobDetail = () => {
  const params = useParams();
  const id: number = parseInt(params.id as string);
  const { chiTietCongViec } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const { auth } = useSelector((state: RootState) => state.quanLyAuth);
  const { binhLuanTheoCongViec } = useSelector(
    (state: RootState) => state.quanLyBinhLuan
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(layChiTietCongViec(id));
    dispatch(layBinhLuanTheoCongViec(id));
  }, [dispatch, id]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddBinhLuanResponse>({
    values: {
      maCongViec: id,
      maNguoiBinhLuan: auth?.user.id as number,
      ngayBinhLuan: new Date(Date.now()).toLocaleDateString(),
      noiDung: "",
      saoBinhLuan: 0,
    },
  });

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <div className="container mx-auto pt-40">
      <div className="flex flex-col space-y-8 lg:flex-row lg:justify-between">
        <div className="w-full lg:w-3/5">
          <h1 className="text-font-32 font-bold">
            {chiTietCongViec?.tenCongViec}
          </h1>
          <i className="fa-solid fa-star"></i>
          <span className="text-font-20 font-bold">
            {chiTietCongViec?.saoCongViec} ({chiTietCongViec?.danhGia})
          </span>
          <img src={chiTietCongViec?.hinhAnh} alt="" className="w-full my-8" />
          <h1 className="text-font-20 font-semibold">About this gig</h1>
          <p>{chiTietCongViec?.moTa}</p>
        </div>
        <div className="w-full lg:w-1/3 border border-color-gray p-8">
          <p className="text-font-30 font-semibold">
            US${chiTietCongViec?.giaTien}
          </p>
          <p className="my-8">{chiTietCongViec?.moTaNgan}</p>
          <NavLink
            to={`/checkout/${chiTietCongViec?.id}`}
            className="block p-2 text-center bg-color-black text-color-white rounded"
          >
            Continue <i className="fa-solid fa-arrow-right"></i>
          </NavLink>
        </div>
      </div>
      <h1 className="py-8 text-font-30">Comments</h1>
      {auth && (
        <form
          onSubmit={handleSubmit(async (value) => {
            try {
              const res = await quanLyBinhLuanService.addBinhLuan(value);
              if (res.data.statusCode !== 400) {
                dispatch(layBinhLuanTheoCongViec(id));
                alert("Add comment successfully");
                reset(value);
              }
            } catch (error) {
              alert("Add comment failed");
            }
          })}
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Comment
              </label>
              <input
                {...register("noiDung", {
                  required: "Please input a comment",
                })}
                type="text"
                id="comment"
                className="border border-color-gray text-sm rounded-lg focus:ring-color-gray-light focus:border-color-green block w-full p-2.5"
                placeholder="Comment"
              />
              <p className="text-[red]">{errors.noiDung?.message}</p>
            </div>
            <div>
              <label htmlFor="rate" className="block mb-2 text-sm font-medium">
                Rate
              </label>
              <input
                {...register("saoBinhLuan", {
                  required: "Please input a rate",
                  min: {
                    value: 1,
                    message: "Value must be >= 1",
                  },
                  max: {
                    value: 5,
                    message: "Value must be <= 5",
                  },
                })}
                type="number"
                id="rate"
                className="border border-color-gray text-sm rounded-lg focus:ring-color-gray-light focus:border-color-green block w-full p-2.5"
                placeholder="Rate"
              />
              <p className="text-[red]">{errors.saoBinhLuan?.message}</p>
            </div>
          </div>
          <button
            type="submit"
            className="text-color-white bg-color-green hover:bg-color-green-light focus:ring-4 focus:outline-none focus:ring-color-green font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      )}
      {binhLuanTheoCongViec
        ?.map((bl, index) => (
          <div key={index} className="border-t border-color-gray-2 py-8">
            <div className="flex flex-row">
              <img
                src={bl.avatar}
                alt=""
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex flex-col space-y-4">
                <h1 className="text-font-20 font-semibold">
                  {bl.tenNguoiBinhLuan}
                </h1>
                <div className="flex flex-row items-center space-x-2">
                  <i className="fa-solid fa-star"></i>
                  <span>
                    {bl.saoBinhLuan} | {bl.ngayBinhLuan}
                  </span>
                </div>
                <p className="">{bl.noiDung}</p>
              </div>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default JobDetail;
