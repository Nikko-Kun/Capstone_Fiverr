import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/config-store";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ThueCongViecResponse } from "../react-app-env";
import { useForm } from "react-hook-form";
import { layChiTietCongViec } from "../redux/quanLyCongViec/thunkAction";
import { quanLyCongViecService } from "../services/quanLyCongViec.service";

const Checkout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id: number = parseInt(params.id as string);
  const { auth } = useSelector((state: RootState) => state.quanLyAuth);
  const { chiTietCongViec } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(layChiTietCongViec(id));
  }, [dispatch, id]);
  const { handleSubmit } = useForm<ThueCongViecResponse>({
    values: {
      maCongViec: id,
      maNguoiThue: auth?.user.id as number,
      ngayThue: new Date(Date.now()).toLocaleDateString(),
      hoanThanh: false,
    },
  });
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mx-auto pt-40">
      <h1 className="text-font-32 font-bold text-center">Checkout</h1>
      <div className="max-w-lg mx-auto border border-color-green rounded-lg p-4 my-8">
        <h1 className="text-font-20 font-bold">Your info</h1>
        <p>Name: {auth.user.name}</p>
        <p>Email: {auth.user.email}</p>
        <p>Phone: {auth.user.phone}</p>
      </div>
      <div className="max-w-lg mx-auto border border-color-green rounded-lg p-4">
        <h1 className="text-font-20 font-bold">
          {chiTietCongViec?.tenCongViec}
        </h1>
        <img src={chiTietCongViec?.hinhAnh} alt="" />
        <p className="text-font-20 font-bold">
          Price: US${chiTietCongViec?.giaTien}
        </p>
        <button
          onClick={handleSubmit(async (value) => {
            try {
              const res = await quanLyCongViecService.addThueCongViec(value);
              if (res.data.statusCode !== 403) {
                navigate("/success");
              }
            } catch (error) {
              alert(error);
            }
          })}
          className="w-full bg-color-black text-color-white rounded py-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
