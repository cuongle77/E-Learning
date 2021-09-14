import axios from "axios";
import * as actionType from "./actionTypes";

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
        method: "GET",
      });

      dispatch({
        tabsCategory: result.data,
        type: actionType.FETCH_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetCourseCategory = (categoryCode) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${categoryCode}&MaNhom=GP08`,
        method: "GET",
      });

      dispatch({
        courseCategory: result.data,
        type: actionType.FETCH_COURSE_CATEGORY,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
