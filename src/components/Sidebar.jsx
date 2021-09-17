import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdViewList } from "react-icons/md";
import { NavLink } from "react-router-dom";

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
      icon: IoMdHome,
      path: "/",
    },
    {
      name: "Courses",
      icon: MdViewList,
      path: "/courses",
    },
  ];

  return (
    <div className={isShow ? "sidebar show" : "sidebar"}>
      <div className="sidebar__content">
        {sidebarList.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => handleActive(index)}
              className={
                active === index ? "sidebar__link action" : "sidebar__link"
              }
              title={item.name}
            >
              <item.icon className="sidebar__link-icon" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
