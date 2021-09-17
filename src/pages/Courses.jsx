import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseItem from "../components/CourseItem";
import { fetchCategory, fetchCourses } from "../store/actions/courses";

const Courses = () => {
  const [group, setGroup] = useState("GP08");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { courses, tabsCategory } = useSelector((state) => state.courseReducer);

  useEffect(() => {
    dispatch(fetchCourses(group));
    dispatch(fetchCategory());
  }, [dispatch, group, code]);

  return (
    <div className="course__all">
      <div className="all__in-function">
        <div className="item">
          <select name="" id="">
            <option value="">Created Date</option>
            <option value="">Title: A-Z</option>
            <option value="">Title: Z-A</option>
            <option value="">Course ID</option>
          </select>
        </div>
        <div className="item">
          <select
            name=""
            id=""
            value={code}
            onChange={(e) => setCode(e.target.value)}
          >
            <option value={group}>All Topic</option>
            {tabsCategory?.map((item, index) => {
              return (
                <option key={index} value={item.maDanhMuc}>
                  {item.tenDanhMuc}
                </option>
              );
            })}
          </select>
        </div>
        <div className="item">
          <select
            name=""
            id=""
            onChange={(e) => setGroup(e.target.value)}
            value={group}
          >
            <option value="GP01">Group 1</option>
            <option value="GP02">Group 2</option>
            <option value="GP03">Group 3</option>
            <option value="GP04">Group 4</option>
            <option value="GP05">Group 5</option>
            <option value="GP06">Group 6</option>
            <option value="GP07">Group 7</option>
            <option value="GP08">Group 8</option>
          </select>
        </div>
        <div className="item search">
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="courses">
        <div className="grid">
          <div className="row" style={{ justifyContent: "center" }}>
            {courses?.map((item, index) => {
              return (
                <div key={index} className="item__wrap">
                  <CourseItem item={item} index={index} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
