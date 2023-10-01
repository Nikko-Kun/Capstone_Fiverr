import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { GroupDetailTypeWork } from "../react-app-env";
import { getDetailTypeWork } from "../store/quanLyCongViec/thunkAction";
import ServiceItem from "./ServiceItem";
import { NavLink } from "react-router-dom";

type Props = {};
export const setItem = (screen: number) => {
  let item = 0;

  if (screen < 480) {
    item = 1;
  } else if (screen >= 480 && screen < 760) {
    item = 2;
  } else if (screen >= 760 && screen < 1000) {
    item = 3;
  } else if (screen >= 1000 && screen < 1250) {
    item = 4;
  } else if (screen >= 1250 && screen < 1600) {
    item = 5;
  }
  return item;
};

const SliderService = (props: Props) => {
  const dispatch = useAppDispatch();
  const screen = window.screen.width;

  useEffect(() => {
    dispatch(getDetailTypeWork());
  }, [dispatch]);

  const { chiTietLoaiCongViec } = useSelector(
    (state: RootState) => state.quanLyCongViec
  );
  const itemShow = setItem(screen);
  const itemIndex = itemShow - 1;

  const [currentSlide, setCurrentSlide] = useState({
    startSlide: 0,
    endSlide: itemIndex,
  });

  const nextSlide = () => {
    if (chiTietLoaiCongViec !== undefined) {
      let newStart =
        currentSlide.startSlide < chiTietLoaiCongViec?.length - itemIndex
          ? currentSlide.endSlide + 1
          : 0;

      let newEnd =
        currentSlide.endSlide < chiTietLoaiCongViec?.length - 1
          ? currentSlide.endSlide + itemShow
          : itemIndex;

      setCurrentSlide({
        startSlide: newStart,
        endSlide: newEnd,
      });
    }
  };

  const prevSlide = () => {
    if (chiTietLoaiCongViec !== undefined) {
      const modSlide = itemShow - (chiTietLoaiCongViec?.length % itemShow);

      let newStart =
        currentSlide.startSlide > itemIndex
          ? currentSlide.startSlide - itemShow
          : chiTietLoaiCongViec.length + modSlide - itemShow;

      let newEnd =
        currentSlide.endSlide > itemIndex
          ? currentSlide.endSlide - itemShow
          : chiTietLoaiCongViec.length + modSlide - 1;

      setCurrentSlide({
        startSlide: newStart,
        endSlide: newEnd,
      });
    }
  };
  const renderCardList = () => {
    return chiTietLoaiCongViec?.map(
      (item: GroupDetailTypeWork, index: number) => {
        const codition =
          index <= currentSlide.endSlide && index >= currentSlide.startSlide;
        const classSide = codition
          ? "duration-700 ease-in-out active mx-3"
          : "hidden";

        return (
          <NavLink to={`category/${item.maLoaiCongviec}`} key={index}>
            <ServiceItem
              classSlide={classSide}
              index={index}
              img={item.hinhAnh}
              title={item.tenNhom}
              codeType={item.maLoaiCongviec}
            />
          </NavLink>
        );
      }
    );
  };

  return (
    <div>
      <div className="relative w-full slide-service" data-carousel="slide">
        {/* Carousel wrapper */}
        <div className="wapper grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {renderCardList()}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="btn-slide left"
          data-carousel-prev
          onClick={() => {
            prevSlide();
          }}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="btn-slide right"
          data-carousel-next
          onClick={() => {
            nextSlide();
          }}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SliderService;
