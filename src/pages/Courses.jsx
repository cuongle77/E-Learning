import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllCourses from "../components/AllCourses";
import CourseSort from "../components/CourseSort";
import FilterCategory from "../components/FilterCategory";
import FilterGroup from "../components/FilterGroup";
import { fetchCategory, fetchCourses } from "../store/actions/courses";

const Courses = () => {
  const [group, setGroup] = useState("GP08");
  const [code, setCode] = useState("all");
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const { courses, tabsCategory } = useSelector((state) => state.courseReducer);

  useEffect(() => {
    dispatch(fetchCourses(code, group, key));
    dispatch(fetchCategory());
  }, [dispatch, group, code, key]);

  const handleSearchCourse = (value) => {
    setCode("all");
    setKey(value);
  };

  return (
    <div className="course__all">
      <div className="all__in-function">
        <div className="item sort">
          <CourseSort />
        </div>

        <div className="item filter__category">
          <FilterCategory
            tabsCategory={tabsCategory}
            code={code}
            setCode={setCode}
          />
        </div>

        <div className="item filter__group">
          <FilterGroup setGroup={setGroup} group={group} />
        </div>

        <div className="item search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearchCourse(e.target.value)}
          />
        </div>
      </div>

      <div className="courses">
        <AllCourses courses={courses} />
      </div>
    </div>
  );
};

export default Courses;
