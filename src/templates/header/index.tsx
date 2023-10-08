import React, { useEffect } from "react";
import FormSearch from "../../components/formSearch/FormSearch";
import { useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/config-store";
import { quanLyAuthActions } from "../../redux/quanLyAuth/slice";
import { getMenuTypeWork } from "../../redux/quanLyCongViec/thunkAction";
import SliderMenu from "../../components/SliderMenu";


const Header = () => {
  const { auth } = useSelector((state: RootState) => state.quanLyAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMenuTypeWork());
  }, [dispatch]);

  // const renderNavWork = () => {
  //   return menuLoaiCongViec?.map((item: MenuTypeWork, index: number) => {
  //     return (
  //       <NavLink to={`category/${item.id}`} key={index}>
  //         <WorkNav
  //           id={item.id}
  //           title={item.tenLoaiCongViec}
  //           listGroupType={item.dsNhomChiTietLoai}
  //         />
  //       </NavLink>
  //     );
  //   });
  // };

  if (auth?.user.role === "ADMIN") {
    return <Navigate to="/admin" />;
  }

  return (
    <header>
      <div className="top">
        <div>
          <NavLink to="/" className="site-logo">
            <svg
              width="89"
              height="27"
              viewBox="0 0 89 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#404145">
                <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
              </g>
              <g fill="#1dbf73">
                <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
              </g>
            </svg>
          </NavLink>
        </div>
        <div className="search">
          <FormSearch
            placeholder="What service are you looking for today?"
            classBtn="btn-search"
            classInput="search-header"
          />
        </div>
        <div>
          <ul className="nav-link">
            <li className="dif">Fiverr Business</li>
            <li>Explore</li>
            <li>
              <i className="fa-solid fa-globe"></i> English
            </li>
            <li>Become a Seller</li>
            <li>
              <NavLink to="/user">
                {auth ? (
                  <>
                    <h1>{auth.user.name}</h1>
                  </>
                ) : (
                  ""
                )}
              </NavLink>
            </li>
            <li>
              {auth ? (
                <div className="user">
                  <button
                    onClick={() => {
                      dispatch(quanLyAuthActions.dangXuat());
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <NavLink to="/login">Sign in</NavLink>
                </>
              )}
            </li>
            <li>
              <NavLink to="/login" className="btn-join">
                Join
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <SliderMenu />
      </div>
    </header>
  );
};

export default Header;
