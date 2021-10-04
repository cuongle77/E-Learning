import React, { useState, useEffect, useRef } from "react";
import {
  IoMdMenu,
  IoMdSearch,
  IoMdKey,
  // IoMdPersonAdd,
  IoIosClose,
  IoMdMore,
} from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { searchCourses } from "../store/actions/courses";

const Navbar = ({ handleShowFullSidebar }) => {
  const account = JSON.parse(localStorage.getItem("account"));
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [clear, setClear] = useState(false);
  const [blur, setBlur] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState("");
  let userRef = useRef("");
  const dispatch = useDispatch();

  const { courseSearch } = useSelector((state) => state.courseReducer);
  const handleShowUserJoin = (e) => {
    return !show ? setShow(true) : setShow(false);
  };
  const handleShowInfoDetail = () => {
    return !showInfo ? setShowInfo(true) : setShowInfo(false);
  };

  const onChangeHandler = (value) => {
    value === ""
      ? setClear(false) || setBlur(false)
      : setClear(true) || setBlur(true);
    let matches = [];
    if (value) {
      matches = courseSearch.filter((course) => {
        const regex = new RegExp(`${value}`, "gi");
        return course.tenKhoaHoc.match(regex);
      });
    }

    setText(value);
    setSuggestions(matches);
  };

  const handleFocus = () => {
    text === "" ? setBlur(false) : setBlur(true);
  };

  const clearValue = () => {
    setText("");
    setClear(false);
    setBlur(false);
  };

  useEffect(() => {
    const handleClose = (e) => {
      if (!userRef.current.contains(e.target)) {
        setShow(false);
        setShowInfo(false);
        setBlur(false);
      }
    };
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  useEffect(() => {
    return text === "" ? null : dispatch(searchCourses(text, null));
  }, [dispatch, text]);

  return (
    <nav className="navbar">
      <div className="nav__content">
        <div className="nav__content-left">
          <IoMdMenu className="menu-icon" onClick={handleShowFullSidebar} />
          <Link to="/" className="nav__logo-link" title="Home">
            <img src={Logo} alt="" />
          </Link>
        </div>

        <div className="nav__search">
          <div className="nav__input" title="Search">
            <IoMdSearch className="nav__icon-search" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onChangeHandler(e.target.value)}
              value={text}
              onFocus={handleFocus}
            />
            <IoIosClose
              className={
                !clear || !text ? "nav__icon-clear" : "nav__icon-clear show"
              }
              onClick={clearValue}
            />
          </div>

          <div
            className="result_search"
            style={
              blur
                ? {
                    opacity: 1,
                    visibility: "visible",
                    transform: "translateY(0%)",
                  }
                : { opacity: 0, visibility: "hidden" }
            }
          >
            <ul className="result__list">
              <p>
                <IoMdSearch className="icon__result" />
                Results for <span> '{text}'</span>
              </p>
              <hr
                style={
                  suggestions?.length === 0
                    ? { display: "none" }
                    : { display: "block" }
                }
              />

              {suggestions &&
                suggestions?.map((course, index) => {
                  return (
                    <li key={index}>
                      <Link
                        to={`/detail/${course.maKhoaHoc}`}
                        onClick={() => setText("")}
                      >
                        <img src={course.hinhAnh} alt="" />
                        <span>{course.tenKhoaHoc}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="nav__content-right">
          <div ref={userRef} className="nav__other">
            {!account ? (
              <>
                <div
                  className="nav__ion-mobile"
                  title="More"
                  onClick={handleShowUserJoin}
                >
                  <IoMdMore className="icon-more" />
                </div>

                <div
                  className={show ? "nav__other-user show" : "nav__other-user"}
                >
                  <div className="nav__btn">
                    <Link
                      to="/login"
                      className="btn nav__btn-login"
                      title="Login"
                    >
                      <IoMdKey className="btn-icon" />
                      Login
                    </Link>
                    {/* <Link
                  to="/sign-up"
                  className="btn nav__btn-register"
                  title="Register"
                >
                  <IoMdPersonAdd className="btn-icon" />
                  Sign Up
                </Link> */}
                  </div>
                </div>
              </>
            ) : (
              <div className="logged">
                <div className="avartar" onClick={handleShowInfoDetail}>
                  <img src="https://i.pravatar.cc/150?img=37" alt="" />

                  <ul
                    className={showInfo ? "info__detail show" : "info__detail"}
                  >
                    <div className="info__user">
                      <img src="https://i.pravatar.cc/150?img=37" alt="" />
                      <span>{account.hoTen}</span>
                    </div>

                    <hr />

                    <div className="item">
                      <Link to="/my-courses">My Courses</Link>
                    </div>

                    <hr />

                    <div className="item item--logout">
                      <Link to="/logout">Log out</Link>
                    </div>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
