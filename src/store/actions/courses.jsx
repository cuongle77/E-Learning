import * as actionType from "./actionTypes";
import axios from "../../settings/axios";
import {
  getAvailableCourseList,
  getListCourseApproval,
  getListCourseApproved,
} from "./user-manage";

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
        type: actionType.FETCH_COURSES,
        courses: result.data,
      });
      showLoader(true);
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchCourseFail = (err) => {
  return {
    type: actionType.SEARCH_COURSE_FAIL,
    err: err,
  };
};

export const searchCourses = (courseName, group) => {
  return async (dispatch) => {
    try {
      let url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${courseName}&MaNhom=${group}`;
      if (group === null) {
        let newGroup = "GP08";
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${courseName}&MaNhom=${newGroup}`;
      }

      const result = await axios.get(url);

      dispatch({
        type: actionType.SEARCH_COURSE,
        courseSearch: result.data,
      });
      dispatch(fetchCourses());
    } catch (err) {
      dispatch(searchCourseFail(err.response.data));
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

      dispatch({
        type: actionType.FETCH_INFO_USER_COURSES,
        userCourse: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
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

      dispatch({
        type: actionType.FETCH_INFO_ACCOUNT_USER,
        userDetail: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
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

      dispatch({
        type: actionType.COURSE_ENROLLED,
        success: result.data,
      });
      dispatch(fetchInfoUserCourses(courseCode));
    } catch (err) {
      dispatch({
        type: actionType.COURSE_ENROLL_FAIL,
        err: err.response.data,
      });
    }
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

      dispatch({
        type: actionType.CANCEL_COURSE_ENROLL,
        messageCancelCourse: result.data,
      });

      dispatch(fetchInfoAccountUser());
      dispatch(getListCourseApproved(account));
      dispatch(getAvailableCourseList(account));
      dispatch(getListCourseApproval(account));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const deleteCourseAction = (
  courseCode,
  keyword,
  groupCode,
  courseType
) => {
  return async (dispatch) => {
    try {
      let url = `/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseCode}`;
      let user = JSON.parse(localStorage.getItem("account"));
      let headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };

      const result = await axios({ method: "DELETE", url, headers });

      dispatch({
        type: actionType.DELETE_COURSE,
        data: result,
      });

      dispatch(fetchCourses(courseType, groupCode, keyword));
    } catch (err) {
      alert(err.response.data);
    }
  };
};

export const updateCourse = (courseDetail) => {
  return async (dispatch) => {
    try {
      let url = "/QuanLyKhoaHoc/CapNhatKhoaHoc";
      const data = {
        maKhoaHoc: courseDetail.maKhoaHoc,
        biDanh: courseDetail.biDanh,
        tenKhoaHoc: courseDetail.tenKhoaHoc,
        moTa: courseDetail.moTa,
        luotXem: courseDetail.luotXem,
        danhGia: 0,
        hinhAnh: courseDetail.hinhAnh,
        maNhom: courseDetail.maNhom,
        ngayTao: courseDetail.ngayTao,
        maDanhMucKhoahoc: courseDetail.maDanhMucKhoahoc,
        taiKhoanNguoiTao: courseDetail.taiKhoanNguoiTao,
      };

      const result = await axios({ method: "PUT", url, data });

      dispatch({
        type: actionType.UPDATE_COURSE,
        updateCourse: result.data,
      });

      dispatch(fetchCourses(data.maDanhMucKhoahoc, data.maNhom, null));
    } catch (err) {
      alert(err.response.data);
    }
  };
};
