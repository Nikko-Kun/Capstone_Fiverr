import React from "react";

type Props = {};

const Introduction = (props: Props) => {
  return (
    <section className="introduction">
      <div className="intro-content">
      <div className="intro-left">
        <h2>The best part? Everything.</h2>
        <h3> <i className="fa-regular fa-circle-check"></i> Stick to your budget</h3>
        <p>
          Find the right service for every price point. No hourly rates, just
          project-based pricing.
        </p>
        <h3> <i className="fa-regular fa-circle-check"></i> Get quality work done quickly</h3>
        <p>
          Hand your project over to a talented freelancer in minutes, get
          long-lasting results.
        </p>

        <h3><i className="fa-regular fa-circle-check"></i> Pay when you're happy</h3>

        <p>
          Upfront quotes mean no surprises. Payments only get released when you
          approve.
        </p>

        <h3><i className="fa-regular fa-circle-check"></i> Count on 24/7 support</h3>

        <p>
          Our round-the-clock support team is available to help anytime,
          anywhere.
        </p>
      </div>
      <div className="intro-right">
        <img
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_2.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
          alt=""
        />
      </div>

      </div>
    </section>
  );
};

export default Introduction;
