import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { FcFolder } from "react-icons/fc";
import { useSelector } from "react-redux";
import {
  CancellingCourseEnroll,
  fetchInfoAccountUser,
} from "../store/actions/courses";

const MyCourses = () => {
  const { userDetail } = useSelector((state) => state.courseReducer);
  const dispatch = useDispatch();

  const handleCancelCourse = (maKhoaHoc) => {
    dispatch(CancellingCourseEnroll(maKhoaHoc, userDetail?.taiKhoan));
  };

  useEffect(() => {
    dispatch(fetchInfoAccountUser());
  }, [dispatch]);

  return (
    <div className="my__courses">
      <div className="my__courses__content">
        <ul className="list__courses">
          <h2>My Courses</h2>

          {userDetail?.chiTietKhoaHocGhiDanh?.length === 0 ? (
            <p>No courses found</p>
          ) : (
            <>
              <hr />

              {userDetail?.chiTietKhoaHocGhiDanh?.map((course, index) => {
                return (
                  <li key={index}>
                    <FcFolder />
                    <Link to={`/detail/${course.maKhoaHoc}`}>
                      {course.tenKhoaHoc}
                    </Link>
                    <button
                      onClick={() => handleCancelCourse(course.maKhoaHoc)}
                    >
                      <CgRemove />
                    </button>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyCourses;
