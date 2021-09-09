import React, { useState, useEffect, useRef } from "react";
import {
  IoMdMenu,
  IoMdSearch,
  IoMdKey,
  IoMdPersonAdd,
  IoMdMore,
} from "react-icons/io";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.webp";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleShowUserJoin = (e) => {
    return !show ? setShow(true) : setShow(false);
  };

  let userRef = useRef("");

  useEffect(() => {
    const handleClose = (e) => {
      if (!userRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav__content">
        <div className="nav__content-left">
          <IoMdMenu className="menu-icon" />
          <NavLink to="/" className="nav__logo-link" title="Home">
            <img src={Logo} alt="" />
          </NavLink>
        </div>

        <div className="nav__content-right">
          <div className="nav__input" title="Search">
            <input type="text" placeholder="Search..." />
            <IoMdSearch className="nav__icon-search" />
          </div>
          <div ref={userRef} className="nav__other">
            <div
              className="nav__ion-mobile"
              title="More"
              onClick={handleShowUserJoin}
            >
              <IoMdMore className="icon-more" />
            </div>

            <div className={show ? "nav__other-user show" : "nav__other-user"}>
              <div className="nav__btn">
                <NavLink
                  to="/login"
                  className="btn nav__btn-login"
                  title="Login"
                >
                  <IoMdKey className="btn-icon" />
                  Login
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className="btn nav__btn-register"
                  title="Register"
                >
                  <IoMdPersonAdd className="btn-icon" />
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
