import React, { useEffect } from "react";
import CountUp from "react-countup";

import { GiTv } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { fetCourseCategory } from "../store/actions/courses";
import CourseItem from "./CourseItem";
import LoadingSmall from "./LoadingSmall";
import TabCategory from "./TabCategory";

const SuggestedCourse = () => {
  const group = "GP08";
  const dispatch = useDispatch();
  const { courseCategory, categoryCode, loading } = useSelector(
    (state) => state.courseReducer
  );

  useEffect(() => {
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

        <TabCategory />

        {loading ? (
          <LoadingSmall />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestedCourse;
