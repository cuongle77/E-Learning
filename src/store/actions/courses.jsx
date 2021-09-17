import * as actionType from "./actionTypes";
import axios from "../../settings/axios";

export const fetchCourses = (groupCode) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupCode}`
      );

      dispatch({
        courses: result.data,
        type: actionType.FETCH_COURSES,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");

      dispatch({
        tabsCategory: result.data,
        type: actionType.FETCH_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetCourseCategory = (categoryCode, groupCode) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${categoryCode}&MaNhom=${groupCode}`
      );

      dispatch({
        courseCategory: result.data,
        type: actionType.FETCH_COURSE_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetCourseDetails = (courseCode) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseCode}`
      );

      dispatch({
        courseDetails: result.data,
        type: actionType.FETCH_COURSE_DETAILS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
