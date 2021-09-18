import * as actionType from "./actionTypes";
import axios from "../../settings/axios";

export const fetchCourses = (courseType, groupCode, keyword) => {
  return async (dispatch) => {
    try {
      let url = `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${courseType}&MaNhom=${groupCode}`;

      if (courseType === "all") {
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupCode}`;
      }

      if (keyword) {
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=${groupCode}`;
      }

      const result = await axios.get(url);

      dispatch({
        courses: result.data,
        type: actionType.FETCH_COURSES,
      });
      showLoader(true);
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
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseCode}`
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

export const showLoader = (status) => ({
  type: actionType.SHOW_LOADER,
  status,
});

export const hideLoader = (status) => ({
  type: actionType.HIDE_LOADER,
  status,
});
