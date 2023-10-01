import { GetCongViecResponse } from "../react-app-env";
import { NavLink } from "react-router-dom";

type Props = {
  congViec: GetCongViecResponse;
};

const CongViecCard = ({ congViec }: Props) => {
  return (
    <div className="rounded border border-gray-700">
      <img src={congViec.hinhAnh} alt="" />
      <div className="p-4">
        <h2 className="font-semibold text-2xl pb-4 mt-6 ">{congViec.tenCongViec}</h2>
        <NavLink
          to={`/${congViec.id}`}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Chi tiết
        </NavLink>
      </div>
    </div>
  );
};

export default CongViecCard;
