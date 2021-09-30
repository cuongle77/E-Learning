import React, { useState } from "react";
import { CgRemove } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";
import { AiFillLike, AiFillFolder } from "react-icons/ai";

const DropDownUserManage = (props) => {
  const {
    title,
    description,
    data,
    enrollHandler,
    handleCancelCourse,
    indexParent,
  } = props;
  const [showCourseList, setShowCourseList] = useState(false);
  const handleShowCourseList = () => {
    return !showCourseList ? setShowCourseList(true) : setShowCourseList(false);
  };

  return (
    <div className="user__course-block">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        <BiChevronDown
          onClick={handleShowCourseList}
          style={
            showCourseList
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
        />
      </div>

      <ul
        className="list__course"
        style={
          showCourseList
            ? { marginTop: "2rem", height: "40vh" }
            : {
                marginTop: "0",
                height: "0",
              }
        }
      >
        {data?.map((course, index) => {
          return (
            <li key={index}>
              <AiFillFolder />
              <p>{course?.tenKhoaHoc}</p>
              {indexParent === 1 ? (
                <>
                  <button onClick={() => enrollHandler(course?.maKhoaHoc)}>
                    <AiFillLike />
                  </button>

                  <button>
                    <CgRemove
                      onClick={() => handleCancelCourse(course?.maKhoaHoc)}
                    />
                  </button>
                </>
              ) : null}

              {indexParent === 2 ? (
                <button>
                  <CgRemove
                    onClick={() => handleCancelCourse(course?.maKhoaHoc)}
                  />
                </button>
              ) : null}

              {indexParent === 3 ? (
                <button onClick={() => enrollHandler(course?.maKhoaHoc)}>
                  <AiFillLike />
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownUserManage;
