import React from "react";



type Props = {
  classSlide: string;
  activeSlide?: string;
  index :number;
  img : string;
  title : string;
  codeType : number;
};

const ServiceItem = (props: Props) => {
  return (
    <div className={props.classSlide} data-carousel-item>
      <div className="card">
        <div className="card-img">
          <img src={props.img} alt="" />
          <div className="card-text">
            <h3>{props.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
