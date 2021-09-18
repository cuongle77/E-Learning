import React from "react";
import CourseItem from "./CourseItem";

const AllCourses = ({ courses }) => {
  return (
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
  );
};

export default AllCourses;
