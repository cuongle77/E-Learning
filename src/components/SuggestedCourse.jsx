import React, { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import * as actionType from "../store/actions/actionTypes";
import { GiTv } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetCourseCategory } from "../store/actions/courses";
import CourseItem from "./CourseItem";

const SuggestedCourse = () => {
  const [indexTab, setIndexTab] = useState(0);
  const group = "GP08";
  const dispatch = useDispatch();
  const { tabsCategory, courseCategory, categoryCode } = useSelector(
    (state) => state.courseReducer
  );

  const handleTabs = useCallback(
    (item, index) => {
      dispatch({
        categoryCode: item,
        type: actionType.FETCH_CATEGORY_CODE,
      });
      setIndexTab(index);
    },

    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetCourseCategory(categoryCode, group));
  }, [dispatch, categoryCode, group]);

  return (
    <div className="course__demo">
      <div className="num__courses">
        <GiTv className="icon" />
        <div className="course__text__wrap">
          <p className="course__text">
            <span className="num__change">
              <CountUp
                start={0}
                end={1000}
                duration={2.75}
                delay={1}
                useEasing={true}
                useGrouping={true}
              />
              +{" "}
            </span>
            online courses
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
                className={indexTab === index ? "tab__btn current" : "tab__btn"}
                onClick={() => handleTabs(item.maDanhMuc, index)}
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
                    <CourseItem item={item} index={index} />
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
