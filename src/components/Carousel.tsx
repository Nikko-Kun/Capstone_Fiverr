import React from "react";
import FormSearch from "./core/FormSearch";

type Props = {};

const Carousel = (props: Props) => {
  return (
    <div className="carousel">
      <div className="carousel-content">
        <h2>
          Find the right <i className="font-playfair">freelance service,</i> right away
        </h2>
        <FormSearch
          classBtn="btn-search-carousel"
          classInput="search-carousel"
          placeholder="Search for any service.."
        />
        <div className="popular">
          <ul>
            <li>Popular: </li>
            <li>
              <button className="btn-popular">Graphic & Design</button>
            </li>
            <li>
              <button className="btn-popular">Writing</button>
            </li>
            <li>
              <button className="btn-popular">Digital Marketing</button>
            </li>
            <li>
              <button className="btn-popular">Music</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
