import React, { useCallback, useEffect, useState } from "react";
import * as actionType from "../store/actions/actionTypes";
import { GiTv } from "react-icons/gi";
import { BiChevronDown } from "react-icons/bi";
import { IoShareSocial, IoHeart } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetCourseCategory } from "../store/actions/courses";

const SuggestedCourse = () => {
  const [isShow, setIsShow] = useState(false);
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();
  const { tabsCategory, courseCategory, categoryCode } = useSelector(
    (state) => state.courseReducer
  );

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetCourseCategory(categoryCode));
  }, [dispatch, categoryCode]);

  const iconInfo = [
    {
      icon: IoShareSocial,
    },
    {
      icon: IoHeart,
    },
    {
      icon: BiChevronDown,
    },
  ];

  const handleShowInfo = (index) => {
    if (index === 2) return !isShow ? setIsShow(true) : setIsShow(false);
  };

  const handleTabs = useCallback(
    (item, index) => {
      setStatus(index);
      dispatch({
        categoryCode: item,
        type: actionType.FETCH_CATEGORY_CODE,
      });
    },
    [dispatch]
  );

  return (
    <div className="course__demo">
      <div className="num__courses">
        <GiTv className="icon" />
        <div className="course__text__wrap">
          <p className="course__text">
            <span className="num__change">1000+</span> online courses
          </p>
          <span className="text__enjoy">Enjoy a variety of fresh topics</span>
        </div>
      </div>

      <div className="typical__course">
        <div className="typical__course-title">
          <h2>The world's best selection of courses</h2>
          <p>
            Choose from 1000 online video courses with new additions published
            every decade
          </p>
        </div>

        <div className="typical__course-detail">
          {tabsCategory?.map((item, index) => {
            return (
              <button
                key={index}
                className={status === index ? "tab__btn current" : "tab__btn"}
                onClick={(e) => handleTabs(item.maDanhMuc, index)}
              >
                {item.tenDanhMuc}
              </button>
            );
          })}
        </div>

        <div className="course__list">
          <div className="grid wide">
            <div className="row" style={{ justifyContent: "center" }}>
              {courseCategory?.map((item, index) => {
                return (
                  <div key={index} className="col l-2">
                    <div className="course__list-item">
                      <NavLink to="###" className="item__top">
                        <div
                          className="item__img"
                          style={{ backgroundImage: `url(${item.hinhAnh})` }}
                        ></div>

                        <div className="item__info">
                          <h4>{item.tenKhoaHoc}</h4>

                          <p>
                            {item.luotXem} <span>views</span>
                          </p>
                        </div>
                      </NavLink>
                      <div className="item__bottom">
                        {iconInfo.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className={
                                index === 2
                                  ? "btn__using btn__show"
                                  : "btn__using"
                              }
                              onClick={() => handleShowInfo(index)}
                            >
                              <item.icon
                                className={
                                  isShow && index === 2
                                    ? "icon__child add"
                                    : "icon__child"
                                }
                                style={
                                  index === 1 ? { marginLeft: "1rem" } : ""
                                }
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div
                        className={isShow ? "item__more show" : "item__more"}
                      >
                        <p>{item.moTa}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCourse;
