import React, { useState } from "react";
import { FaHome, FaUsersCog } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";
import { RiFileSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = ({ isShow }) => {
  const [active, setActive] = useState(0);

  const handleActive = (index) => {
    if (active === index) {
      setActive(index);
    }

    setActive(index);
  };

  let sidebarList = [
    {
      name: "Dashboard",
      icon: FaHome,
      path: "/",
    },
    {
      name: "Courses",
      icon: AiFillAppstore,
      path: "/courses",
    },
    {
      name: "Courses Manage",
      icon: RiFileSettingsFill,
      path: "/course-management",
    },
    {
      name: "User Manage",
      icon: FaUsersCog,
      path: "/user-management",
    },
  ];

  return (
    <div className={isShow ? "sidebar show" : "sidebar"}>
      <div className="sidebar__content">
        {sidebarList.map((item, index) => {
          return (
            <div
              key={index}
              className="content__ousite-link"
              onClick={() => handleActive(index)}
            >
              <Link
                to={item.path}
                className={active === index ? "link action" : "link"}
              >
                <item.icon className="link__icon" />
                <span>{item.name}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
