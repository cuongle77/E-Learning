import React from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { deleteCourseAction } from "../store/actions/course-manage";

const CourseItemManage = ({
  course,
  dispatch,
  fetCourseDetails,
  setDisable,
  showTitle,
  setCustomShow,
  setShowBlockEdit,
  group,
  code,
}) => {
  const viewInfoCourse = (maKhoaHoc) => {
    dispatch(fetCourseDetails(maKhoaHoc));
    setDisable({ disabled: "disabled" });
    showTitle(false);
    setShowBlockEdit(true);
  };

  const editCourse = (maKhoaHoc) => {
    dispatch(fetCourseDetails(maKhoaHoc));
    setDisable(null);
    showTitle(true);
    setShowBlockEdit(true);
    setCustomShow(false);
  };

  const deleteCourse = (maKhoaHoc) => {
    dispatch(deleteCourseAction(maKhoaHoc, null, group, code));
  };

  return (
    <div className="course__item-manage">
      <div
        className="item__top"
        onClick={() => viewInfoCourse(course?.maKhoaHoc)}
      >
        <div
          className="item__img"
          style={{ backgroundImage: `url(${course?.hinhAnh})` }}
        ></div>

        <div className="item__info">
          <h4>
            {course?.tenKhoaHoc.length >= 25
              ? course?.tenKhoaHoc.substring(0, 20) + "..."
              : course?.tenKhoaHoc}
          </h4>
        </div>
      </div>
      <div className="item__bottom">
        <button
          className="btn__using"
          onClick={() => editCourse(course?.maKhoaHoc)}
        >
          <MdEdit />
        </button>
        <button
          className="btn__using"
          onClick={() => deleteCourse(course?.maKhoaHoc)}
        >
          <IoMdTrash />
        </button>
      </div>
    </div>
  );
};

export default CourseItemManage;
