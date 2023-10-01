import React, { useState } from "react";
import { listNember, MemberContent } from "../constant/member_constant";
import Member from "./Member";

type Props = {};

const SliderMember = (props: Props) => {
  const [currentSlide, setCurrentSlide] = useState({
    currentSlide: 0,
  });
  const nextSlide = () => {
    let newSlide =
      currentSlide.currentSlide === listNember.length - 1
        ? 0
        : currentSlide.currentSlide + 1;
    setCurrentSlide({ currentSlide: newSlide });
  };

  const prevSlide = () => {
    let newSlide =
      currentSlide.currentSlide === 0
        ? listNember.length - 1
        : currentSlide.currentSlide - 1;
    setCurrentSlide({ currentSlide: newSlide });
  };

  const renderListMember = () => {
    return listNember.map((item: MemberContent, index: number) => {
      const classSide =
        index === currentSlide.currentSlide
          ? "duration-700 ease-in-out"
          : "hidden";
      const activeSlide = index === currentSlide.currentSlide ? "active" : "";
      return (
        <Member
          imgSrc={item.imgSrc}
          author={item.author}
          logo={item.logo}
          content={item.content}
          key={index}
          classSlide={classSide}
          activeSlide={activeSlide}
        />
      );
    });
  };

  return (
    <div>
      <div
        className="relative w-full slideMember"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="wapper">
          {renderListMember()}
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

export default SliderMember;
