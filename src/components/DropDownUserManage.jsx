import React, { useState } from "react";
import { CgRemove } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";
import { AiFillLike, AiFillFolder } from "react-icons/ai";
import LoadingSmall from "../components/LoadingSmall";
import { useDispatch, useSelector } from "react-redux";
import { courseEnrollment } from "../store/actions/user-manage";
import { CancellingCourseEnroll } from "../store/actions/courses";

const DropDownUserManage = (props) => {
  const { title, description, data, infoUser, indexParent } = props;
  const [showCourseList, setShowCourseList] = useState(false);
  const { loading } = useSelector((state) => state.userManagementReducer);
  const dispatch = useDispatch();

  const enrollHandler = (courseType, account = infoUser?.taiKhoan) => {
    dispatch(courseEnrollment(courseType, account));
  };

  const handleCancelCourse = (codeCourrse, account = infoUser?.taiKhoan) => {
    dispatch(CancellingCourseEnroll(codeCourrse, account));
  };

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
        {loading ? (
          <LoadingSmall />
        ) : (
          data?.map((course, index) => {
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
          })
        )}
      </ul>
    </div>
  );
};

export default DropDownUserManage;
