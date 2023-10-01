import React from "react";

type Props = {
  imgSrc: string;
  author: string;
  content: string;
  logo: string;
  classSlide : string;
  activeSlide :string;
};

const Member = (props: Props) => {
  return (
    <div className={props.classSlide} data-carousel-item={props.activeSlide}>
      <div className="member-item">
        <div className="member-left">
          <img
            src={props.imgSrc}
            alt=""
          />
        </div>
        <div className="member-right">
          <div className="author">
          <h5>{props.author}</h5>
            <span>|</span>
            <img src={props.logo} alt="" />
          </div>
          <div className="qoute">
          <i className="md:text-font-20">{props.content}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
