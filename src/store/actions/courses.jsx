import * as actionType from "./actionTypes";
import axios from "../../settings/axios";
import {
  getAvailableCourseList,
  getListCourseApproval,
  getListCourseApproved,
} from "./user-manage";

export const fetchCourseStart = () => {
  return {
    type: actionType.FETCH_COURSES_START,
  };
};

export const fetchCourseSuccess = (courses) => {
  return {
    type: actionType.FETCH_COURSES_SUCCESS,
    courses: courses,
  };
};

export const fetchCourseFail = (error) => {
  return {
    type: actionType.FETCH_COURSES_FAILURE,
    error: error,
  };
};

export const fetchCourses = (courseType, groupCode, keyword) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseStart());
      let url = `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${courseType}&MaNhom=${groupCode}`;
      if (courseType === "all") {
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupCode}`;
      }
      if (keyword) {
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=${groupCode}`;
      }

      const result = await axios.get(url);

      dispatch(fetchCourseSuccess(result?.data));
    } catch (error) {
      dispatch(fetchCourseFail(error.response?.data));
    }
  };
};

export const searchCourseStart = () => {
  return {
    type: actionType.SEARCH_COURSE_START,
  };
};

export const searchCourseSuccess = (courseSearch) => {
  return {
    type: actionType.SEARCH_COURSE_SUCCESS,
    courseSearch: courseSearch,
  };
};

export const searchCourseFail = (error) => {
  return {
    type: actionType.SEARCH_COURSE_FAILURE,
    error: error,
  };
};

export const searchCourses = (courseName, group) => {
  return async (dispatch) => {
    try {
      dispatch(searchCourseStart());

      let url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${courseName}&MaNhom=${group}`;
      if (group === null) {
        let newGroup = "GP08";
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${courseName}&MaNhom=${newGroup}`;
      }

      const result = await axios.get(url);

      dispatch(searchCourseSuccess(result?.data));
    } catch (err) {
      dispatch(searchCourseFail(err.response?.data));
    }
  };
};

export const fetchCategoryStart = () => {
  return {
    type: actionType.FETCH_CATEGORY_START,
  };
};

export const fetchCategorySuccess = (tabsCategory) => {
  return {
    type: actionType.FETCH_CATEGORY_SUCCESS,
    tabsCategory: tabsCategory,
  };
};

export const fetchCategoryFail = (error) => {
  return {
    type: actionType.FETCH_CATEGORY_FAILURE,
    error: error,
  };
};

export const fetchCategory = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCategoryStart());
      const result = await axios.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");

      dispatch(fetchCategorySuccess(result?.data));
    } catch (error) {
      dispatch(fetchCategoryFail(error.response?.data));
    }
  };
};

export const fetCourseCategoryStart = () => {
  return {
    type: actionType.FETCH_COURSE_CATEGORY_START,
  };
};

export const fetCourseCategorySuccess = (courseCategory) => {
  return {
    type: actionType.FETCH_COURSE_CATEGORY_SUCCESS,
    courseCategory: courseCategory,
  };
};

export const fetCourseCategoryFail = (error) => {
  return {
    type: actionType.FETCH_COURSE_CATEGORY_FAILURE,
    error: error,
  };
};

export const fetCourseCategory = (categoryCode, groupCode) => {
  return async (dispatch) => {
    try {
      dispatch(fetCourseCategoryStart());
      const result = await axios.get(
        `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${categoryCode}&MaNhom=${groupCode}`
      );

      dispatch(fetCourseCategorySuccess(result?.data));
    } catch (error) {
      dispatch(fetCourseCategoryFail(error.response?.data));
    }
  };
};

export const fetchCourseDetailsStart = () => {
  return {
    type: actionType.FETCH_COURSE_DETAILS_START,
  };
};

export const fetchCourseDetailsSuccess = (courseDetails) => {
  return {
    type: actionType.FETCH_COURSE_DETAILS_SUCCESS,
    courseDetails: courseDetails,
  };
};

export const fetchCourseDetailsFail = (error) => {
  return {
    type: actionType.FETCH_COURSE_DETAILS_FAILURE,
    error: error,
  };
};

export const fetCourseDetails = (courseCode) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseDetailsStart());
      const result = await axios.get(
        `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseCode}`
      );
      dispatch(fetchCourseDetailsSuccess(result?.data));
      dispatch(fetchInfoUserCourses(courseCode));
    } catch (error) {
      dispatch(fetchCourseDetailsFail(error.response?.data));
    }
  };
};

export const CourseEnrollSuccess = (success) => {
  return {
    type: actionType.COURSE_ENROLLED_SUCCESS,
    success: success,
  };
};

export const CourseEnrollFailure = (error) => {
  return {
    type: actionType.COURSE_ENROLL_FAILURE,
    error: error,
  };
};

export const CourseEnroll = (courseCode, account) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      const url = "/QuanLyKhoaHoc/DangKyKhoaHoc";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        maKhoaHoc: courseCode,
        taiKhoan: account,
      };

      const result = await axios({ method: "POST", url, headers, data });

      dispatch(CourseEnrollSuccess(result?.data));
      // dispatch(fetchInfoUserCourses(courseCode));
    } catch (error) {
      dispatch(CourseEnrollFailure(error.response?.data));
    }
  };
};

export const CancellingCourseEnrollSuccess = (success) => {
  return {
    type: actionType.CANCEL_COURSE_ENROLL_SUCCESS,
    success: success,
  };
};

export const CancellingCourseEnrollFailure = (error) => {
  return {
    type: actionType.CANCEL_COURSE_ENROLL_SUCCESS,
    error: error,
  };
};

export const CancellingCourseEnroll = (courseCode, account) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      const url = "/QuanLyKhoaHoc/HuyGhiDanh";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        maKhoaHoc: courseCode,
        taiKhoan: account,
      };

      const result = await axios({ method: "POST", url, headers, data });

      dispatch(CancellingCourseEnrollSuccess(result?.data));
      dispatch(fetchInfoAccountUser());
      dispatch(getListCourseApproved(account));
      dispatch(getAvailableCourseList(account));
      dispatch(getListCourseApproval(account));
    } catch (error) {
      dispatch(CancellingCourseEnrollFailure(error.response?.data));
    }
  };
};

export const fetchInfoAccountUserSuccess = (userDetail) => {
  return {
    type: actionType.FETCH_INFO_ACCOUNT_USER_SUCCESS,
    userDetail: userDetail,
  };
};

export const fetchInfoAccountUserFailure = (error) => {
  return {
    type: actionType.FETCH_INFO_ACCOUNT_USER_SUCCESS,
    error: error,
  };
};

export const fetchInfoAccountUser = () => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      const url = "/QuanLyNguoiDung/ThongTinTaiKhoan";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        taiKhoan: user?.taiKhoan,
      };

      const result = await axios({ method: "POST", url, headers, data });

      dispatch(fetchInfoAccountUserSuccess(result?.data));
    } catch (error) {
      dispatch(fetchInfoAccountUserFailure(error.response?.data));
    }
  };
};

export const fetchInfoUserCoursesSuccess = (userCourse) => {
  return {
    type: actionType.FETCH_INFO_USER_COURSES_SUCCESS,
    userCourse: userCourse,
  };
};

export const fetchInfoUserCoursesFailure = (error) => {
  return {
    type: actionType.FETCH_INFO_USER_COURSES_FAILURE,
    error: error,
  };
};

export const fetchInfoUserCourses = (courseId) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      const url = `/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${courseId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const result = await axios({ method: "GET", url, headers });

      dispatch(fetchInfoAccountUserSuccess(result?.data));
    } catch (error) {
      dispatch(fetchInfoUserCoursesFailure(error.response?.data));
    }
  };
};
