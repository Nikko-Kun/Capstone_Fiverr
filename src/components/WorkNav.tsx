import React from "react";
import { DetailTypeWork, GroupDetailTypeWork } from "../react-app-env";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

type Props = {
  id: number;
  title: string;
  listGroupType?: GroupDetailTypeWork[];
};

const WorkNav = (props: Props) => {
  const renderSubGroup = () => {
    return props.listGroupType?.map(
      (item: GroupDetailTypeWork, index: number) => {
        return (
          <div className="subGroup" key={index}>
            <h5>{item.tenNhom}</h5>
            <ul>
              {item.dsChiTietLoai?.map(
                (detail: DetailTypeWork, index: number) => {
                  return (
                    <li key={index}>
                      <NavLink to={`/job-type/${detail.id}`}>
                        {detail.tenChiTiet}
                      </NavLink>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        );
      }
    );
  };
  return (
    <div className="workNav">
      <div className="title">
        <p>{props.title}</p>
        <div
          className={clsx("collape-nav", {
            active: props.listGroupType?.length !== 0 ? true : false,
          })}
        >
          {renderSubGroup()}
        </div>
      </div>
    </div>
  );
};

export default WorkNav;
