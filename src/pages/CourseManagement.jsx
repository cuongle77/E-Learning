import React, { useEffect, useState } from "react";
import { IoAddSharp, IoShieldCheckmark } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import CourseItemManage from "../components/CourseItemManage";
import FilterCategory from "../components/FilterCategory";
import FilterGroup from "../components/FilterGroup";
import {
  fetchCategory,
  fetchCourses,
  fetCourseDetails,
  updateCourse,
} from "../store/actions/courses";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CourseManagement = () => {
  const [group, setGroup] = useState("GP08");
  const [code, setCode] = useState("all");
  const [key, setKey] = useState("");
  const [disable, setDisable] = useState({});
  const [title, showTitle] = useState(false);
  const [customShow, setCustomShow] = useState(false);
  const [showBlockEdit, setShowBlockEdit] = useState(false);
  const dispatch = useDispatch();
  const { courses, tabsCategory, courseDetails } = useSelector(
    (state) => state.courseReducer
  );
  const secondExample = {
    size: 20,
    count: 5,
    color: "#999",
    activeColor: "#ff8906",
    value: 4,
    a11y: true,
    isHalf: true,
  };
  const [courseState, setCourseState] = useState({
    maKhoaHoc: null,
    biDanh: null,
    tenKhoaHoc: null,
    moTa: null,
    luotXem: null,
    danhGia: null,
    hinhAnh: null,
    maNhom: null,
    maDanhMucKhoahoc: null,
    ngayTao: new Date(),
    nguoiTao: null,
  });

  const addCourse = (e) => {
    e.preventDefault();
    setCourseState({});
    showTitle(true);
    setCustomShow(true);
    setDisable(null);
    setShowBlockEdit(true);
  };

  const handleSearchCourse = (value) => {
    setCode("all");
    setKey(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCourseState({
      ...courseState,
      [name]: value,
    });
  };

  const submitCourse = (e) => {
    e.preventDefault();
    dispatch(updateCourse(courseState));
  };

  useEffect(() => {
    dispatch(fetchCourses(code, group, key));
    dispatch(fetchCategory());
  }, [dispatch, group, code, key]);

  useEffect(() => {
    setCourseState({
      maKhoaHoc: courseDetails?.maKhoaHoc,
      biDanh: courseDetails?.biDanh,
      tenKhoaHoc: courseDetails?.tenKhoaHoc,
      moTa: courseDetails?.moTa,
      luotXem: courseDetails?.luotXem,
      danhGia: 0,
      hinhAnh: courseDetails?.hinhAnh,
      maNhom: courseDetails?.maNhom,
      maDanhMucKhoahoc: courseDetails?.danhMucKhoaHoc?.maDanhMucKhoahoc,
      ngayTao: courseDetails?.ngayTao,
      nguoiTao: courseDetails?.nguoiTao?.taiKhoan,
    });
  }, [courseDetails]);

  const totalCourse = courses?.reduce((total, course, index) => {
    return (total = index + 1);
  }, 0);

  return (
    <div className="course__management">
      <div className="grid">
        <div className="row">
          <div className="col l-6">
            <div className="course__list">
              <div className="course__list-header">
                <div className="header__top">
                  <button className="icon__add" onClick={addCourse} title="Add">
                    <IoAddSharp />
                  </button>
                  <p>
                    <IoShieldCheckmark />
                    {totalCourse} courses was found!
                  </p>
                  <div className="filter">
                    <div className="item filter__category">
                      <FilterCategory
                        code={code}
                        setCode={setCode}
                        tabsCategory={tabsCategory}
                      />
                    </div>
                    <div className="item filter__group">
                      <FilterGroup setGroup={setGroup} group={group} />
                    </div>
                  </div>
                </div>
                <div className="header__bottom">
                  <input
                    type="text"
                    placeholder="Search Course...."
                    onChange={(e) => handleSearchCourse(e.target.value)}
                  />
                </div>
              </div>
              <div className="course__render">
                <div className="course__render-content">
                  {courses?.map((course, index) => {
                    return (
                      <div key={index} className="course__wrap">
                        <CourseItemManage
                          group={group}
                          code={code}
                          setDisable={setDisable}
                          showTitle={showTitle}
                          setCustomShow={setCustomShow}
                          setShowBlockEdit={setShowBlockEdit}
                          course={course}
                          dispatch={dispatch}
                          fetCourseDetails={fetCourseDetails}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col l-6">
            <div
              className="course__detail"
              style={
                showBlockEdit
                  ? { visibility: "visible", opacity: "1" }
                  : { visibility: "hidden", opacity: "0" }
              }
            >
              <form
                action=""
                className="course__detail-course"
                onSubmit={submitCourse}
              >
                <h2 className={title ? "title show" : "title"}>
                  {customShow ? "Add Course" : "Edit Course"}
                </h2>
                <div className="detail__top">
                  <div className="top__left">
                    <div
                      className="img"
                      style={
                        customShow && title
                          ? null
                          : {
                              backgroundImage: `url(${courseDetails?.hinhAnh})`,
                            }
                      }
                    >
                      {customShow && title ? (
                        <span>Please upload an image for preview</span>
                      ) : null}
                    </div>
                    {customShow && title ? null : (
                      <div className="icon__star">
                        <ReactStars {...secondExample} />
                      </div>
                    )}
                    <div className="form__field">
                      <label htmlFor="">Course Name</label>
                      <input
                        type="text"
                        name="tenKhoaHoc"
                        value={courseState?.tenKhoaHoc || ""}
                        onChange={handleChange}
                        {...disable}
                      />
                    </div>
                  </div>
                  <div className="top__right">
                    <div className="form__field">
                      <label htmlFor="">Course ID</label>
                      <input
                        type="text"
                        name="maKhoaHoc"
                        value={courseState?.maKhoaHoc || ""}
                        onChange={handleChange}
                        {...disable}
                      />
                    </div>
                    <div className="form__field">
                      <label htmlFor="">Creator</label>
                      <input
                        type="text"
                        name="nguoiTao"
                        value={courseState?.nguoiTao || ""}
                        onChange={handleChange}
                        {...disable}
                      />
                    </div>
                    <div className="form__field">
                      <label htmlFor="">Views</label>
                      <input
                        type="text"
                        name="luotXem"
                        value={courseState?.luotXem || "0"}
                        onChange={handleChange}
                        {...disable}
                      />
                    </div>
                    <div className="form__field">
                      <label htmlFor="">Date picker dialog</label>
                      <DatePicker
                        name="ngayTao"
                        onChange={handleChange}
                        value={courseState?.ngayTao || ""}
                        {...disable}
                      />
                    </div>
                  </div>
                </div>
                <div className="detail__center">
                  <div className="form__field">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="moTa"
                      value={courseState?.moTa || ""}
                      onChange={handleChange}
                      {...disable}
                    />
                  </div>
                </div>
                <div className="detail__bottom">
                  <div className="item">
                    <select
                      name="maDanhMucKhoaHoc"
                      value={courseState?.maDanhMucKhoahoc || ""}
                      onChange={handleChange}
                      {...disable}
                    >
                      <option value="all">All Topic</option>

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
                      name="maNhom"
                      value={courseState?.maNhom || "GP08"}
                      onChange={handleChange}
                      {...disable}
                    >
                      <option value="GP01">Group 1</option>
                      <option value="GP02">Group 2</option>
                      <option value="GP03">Group 3</option>
                      <option value="GP04">Group 4</option>
                      <option value="GP05">Group 5</option>
                      <option value="GP06">Group 6</option>
                      <option value="GP07">Group 7</option>
                      <option value="GP08">Group 8</option>
                      <option value="GP09">Group 9</option>
                      <option value="GP10">Group 10</option>
                      <option value="GP11">Group 11</option>
                      <option value="GP12">Group 12</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  style={title ? { display: "block" } : { display: "none" }}
                >
                  Summit
                </button>
              </form>
              <div className="course__detail-user"></div>
            </div>
            {/* <div className="edit__course"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
