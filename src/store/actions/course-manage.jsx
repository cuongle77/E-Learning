import * as actionType from "./actionTypes";
import axios from "../../settings/axios";

export const fetchCourseListStart = () => {
  return {
    type: actionType.FETCH_COURSES_LIST_START,
  };
};

export const fetchCourseListSuccess = (courseList) => {
  return {
    type: actionType.FETCH_COURSES_LIST_SUCCESS,
    courseList: courseList,
  };
};
export const fetchCourseListFailure = (error) => {
  return {
    type: actionType.FETCH_COURSES_LIST_FAILURE,
    error: error,
  };
};

export const fetchCourseList = (courseType, groupCode, keyword) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseListStart());
      let url = `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${courseType}&MaNhom=${groupCode}`;
      if (courseType === "all") {
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupCode}`;
      }
      if (keyword) {
        url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}&MaNhom=${groupCode}`;
      }

      const reuslt = await axios.get(url);

      dispatch(fetchCourseListSuccess(reuslt.data));
    } catch (error) {
      dispatch(fetchCourseListFailure(error.response.data));
    }
  };
};

export const deleteCourseSuccess = (success) => {
  return {
    type: actionType.DELETE_COURSE_SUCCESS,
    success: success,
  };
};

export const deleteCourseFailure = (error) => {
  return {
    type: actionType.DELETE_COURSE_FAILURE,
    error: error,
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

      dispatch(deleteCourseSuccess(result?.data));
      dispatch(fetchCourseList(courseType, groupCode, keyword));
    } catch (error) {
      dispatch(deleteCourseFailure(error.response.data));
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
        updateCourse: result?.data,
      });

      dispatch(fetchCourseList(data.maDanhMucKhoahoc, data.maNhom, null));
    } catch (err) {
      alert(err.response?.data);
    }
  };
};
