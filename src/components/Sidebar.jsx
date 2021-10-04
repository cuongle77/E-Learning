import React from "react";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";
import { RiFileSettingsFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isShow }) => {
  const user = JSON.parse(localStorage.getItem("account"));

  return (
    <div className={isShow ? "sidebar show" : "sidebar"}>
      <div className="sidebar__content">
        <div className="content__ousite-link">
          <NavLink exact to="/" className="link" activeClassName="active">
            <FaHome className="link__icon" />
            <span>Home</span>
          </NavLink>
        </div>

        <div className="content__ousite-link">
          <NavLink
            exact
            to="/courses"
            className="link"
            activeClassName="active"
          >
            <AiFillAppstore className="link__icon" />
            <span>Courses</span>
          </NavLink>
        </div>

        {user && user.maLoaiNguoiDung === "GV" ? (
          <>
            <div className="content__ousite-link">
              <NavLink
                exact
                to="/course-management"
                className="link"
                activeClassName="active"
              >
                <RiFileSettingsFill className="link__icon" />
                <span>Course Admin</span>
              </NavLink>
            </div>
            <div className="content__ousite-link">
              <NavLink
                exact
                to="/user-management"
                className="link"
                activeClassName="active"
              >
                <FaUsersCog className="link__icon" />
                <span>User Admin</span>
              </NavLink>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
