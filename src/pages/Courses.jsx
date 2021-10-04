import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoShieldCheckmark } from "react-icons/io5";
import AllCourses from "../components/AllCourses";
import CourseSort from "../components/CourseSort";
import FilterCategory from "../components/FilterCategory";
import FilterGroup from "../components/FilterGroup";
import LoadingSmall from "../components/LoadingSmall";
import { fetchCourses } from "../store/actions/courses";

const Courses = () => {
  const [group, setGroup] = useState("GP08");
  const [code, setCode] = useState("all");
  const [key, setKey] = useState("");
  const { courses, tabsCategory, loading } = useSelector(
    (state) => state.courseReducer
  );
  const dispatch = useDispatch();

  const handleSearchCourse = (value) => {
    setCode("all");
    setKey(value);
  };

  const totalCourse = courses?.reduce((total, course, index) => {
    return (total = index + 1);
  }, 0);

  useEffect(() => {
    return key === "" ? null : dispatch(fetchCourses(code, group, key));
  }, [dispatch, code, key, group]);

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
          <FilterGroup
            setGroup={setGroup}
            code={code}
            group={group}
            key={key}
          />
        </div>

        <div className="item search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearchCourse(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSmall />
      ) : (
        <>
          <div className="count__course">
            <p>
              <IoShieldCheckmark />
              {totalCourse} courses was found!
            </p>
          </div>
          <div className="courses">
            <AllCourses courses={courses} />
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
