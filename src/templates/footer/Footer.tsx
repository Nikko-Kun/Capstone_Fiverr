import React from "react";
import { NavLink } from "react-router-dom";
import { footerNav } from "../../constant/footer_constant";
import { pathIconSocial } from "../../constant/footer_constant";

const Footer = () => {
  const renderFooterNav = () => {
    const result = [];
    for (let [key, value] of Object.entries(footerNav)) {
      let title = key;
      if (title === 'More_From_Fiverr'){
       let  newtitle = title.replace(/_/g," ")
       title = newtitle
      }
      const newValue = value.map((item:string,index:number) => {
        return (
          <p className="mb-4" key={index+item}>
            <NavLink to="#" className="text-main">
              {item}
            </NavLink>
          </p>
        );
      });
      result.push(
        <div className="item-footer" key={title}>
          <h6 className="title-item">{title}</h6>
          {newValue}
        </div>
      );
    }
    return result;
  };
  const renderIconSocial = () => {
    const result = [];
    for (let [key,value] of Object.entries(pathIconSocial)) {
      result.push(
        <li key={key}>
          <NavLink to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={value.path} />
            </svg>
          </NavLink>
        </li>
      );
    }
    return result;
  };
  return (
    <footer>
      <div className="footer-link line-top container">
        <div className="item-link">
          {/* Products section */}
          {renderFooterNav()}
        </div>
      </div>
      <div className="bottom line-top">
        <div className="logo">
          <span className="fiverr-logo-footer">
            <svg
              width={72}
              height={27}
              viewBox="0 0 91 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#7A7D85">
                <path d="m82.9 13.1h-3.2c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-13.4h-2.6c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-18.4h6.1v2.8c1-2.2 2.4-2.8 4.4-2.8h7.4v2.8c1-2.2 2.4-2.8 4.4-2.8h2v5zm-25.6 5.6h-12.6c.3 2.1 1.6 3.2 3.8 3.2 1.6 0 2.8-.7 3.1-1.8l5.4 1.5c-1.3 3.2-4.6 5.1-8.5 5.1-6.6 0-9.6-5.1-9.6-9.5 0-4.3 2.6-9.4 9.2-9.4 7 0 9.3 5.2 9.3 9.1 0 .9 0 1.4-.1 1.8zm-5.9-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3.1.8-3.4 3zm-23.1 11.3h5.3l6.7-18.3h-6.1l-3.2 10.7-3.4-10.8h-6.1zm-24.9 0h6v-13.4h5.7v13.4h6v-18.4h-11.6v-1.1c0-1.2.9-2 2.3-2h3.5v-5h-4.4c-4.5 0-7.5 2.7-7.5 6.6v1.5h-3.4v5h3.4z" />
              </g>
              <g fill="#7A7D85">
                <path d="m90.4 23.3c0 2.1-1.6 3.7-3.8 3.7s-3.8-1.6-3.8-3.7 1.6-3.7 3.8-3.7c2.2-.1 3.8 1.5 3.8 3.7zm-.7 0c0-1.8-1.3-3.1-3.1-3.1s-3.1 1.3-3.1 3.1 1.3 3.1 3.1 3.1 3.1-1.4 3.1-3.1zm-1.7.8.1.9h-.7l-.1-.9c0-.3-.2-.5-.5-.5h-.8v1.4h-.7v-3.5h1.4c.7 0 1.2.4 1.2 1.1 0 .4-.2.6-.5.8.4.1.5.3.6.7zm-1.9-1h.7c.4 0 .5-.3.5-.5 0-.3-.2-.5-.5-.5h-.7z" />
              </g>
            </svg>
          </span>
          <NavLink to="https://tailwind-elements.com/">
            <span className="copyright">© Fiverr International Ltd. 2023</span>
          </NavLink>
        </div>
        {/* Social network icons container */}
        <div className="social">
          <ul>
            {renderIconSocial()}
            <li>
              <button>English</button>
            </li>
            <li>
              <button>US$ USD</button>
            </li>
            <li>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15.5"
                  fill="white"
                  stroke="currentColor"
                  className="circle-wrapper"
                ></circle>
                <path d="M16 11.5833C17.1506 11.5833 18.0834 10.6506 18.0834 9.49999C18.0834 8.3494 17.1506 7.41666 16 7.41666C14.8494 7.41666 13.9167 8.3494 13.9167 9.49999C13.9167 10.6506 14.8494 11.5833 16 11.5833Z"></path>
                <path d="M23.9167 12.4167H8.08333C7.86232 12.4167 7.65036 12.5045 7.49408 12.6607C7.3378 12.817 7.25 13.029 7.25 13.25C7.25 13.471 7.3378 13.683 7.49408 13.8392C7.65036 13.9955 7.86232 14.0833 8.08333 14.0833H13.5V25.5417C13.5 25.8179 13.6097 26.0829 13.8051 26.2782C14.0004 26.4736 14.2654 26.5833 14.5417 26.5833C14.8179 26.5833 15.0829 26.4736 15.2782 26.2782C15.4736 26.0829 15.5833 25.8179 15.5833 25.5417V19.5H16.4167V25.5417C16.4167 25.8179 16.5264 26.0829 16.7218 26.2782C16.9171 26.4736 17.1821 26.5833 17.4583 26.5833C17.7346 26.5833 17.9996 26.4736 18.1949 26.2782C18.3903 26.0829 18.5 25.8179 18.5 25.5417V14.0833H23.9167C24.1377 14.0833 24.3496 13.9955 24.5059 13.8392C24.6622 13.683 24.75 13.471 24.75 13.25C24.75 13.029 24.6622 12.817 24.5059 12.6607C24.3496 12.5045 24.1377 12.4167 23.9167 12.4167Z"></path>
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
