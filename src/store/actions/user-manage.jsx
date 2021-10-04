import axios from "../../settings/axios";
import * as actionType from "../actions/actionTypes";

export const getUserListStart = () => {
  return {
    type: actionType.FETCH_USER_LIST_START,
  };
};

export const getUserListSuccess = (userList) => {
  return {
    type: actionType.FETCH_USER_LIST_SUCCESS,
    userList: userList,
  };
};

export const getUserListFailure = (error) => {
  return {
    type: actionType.FETCH_USER_LIST_FAILURE,
    error: error,
  };
};

export const getUserList = (group) => {
  return async (dispatch) => {
    try {
      dispatch(getUserListStart());
      let url = `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${group}`;
      const result = await axios.get(url);

      dispatch(getUserListSuccess(result.data));
    } catch (error) {
      dispatch(getUserListFailure(error.response.data));
    }
  };
};

export const searchUserListStart = () => {
  return {
    type: actionType.SEARCH_USER_LIST_START,
  };
};

export const searchUserListSuccess = (userList) => {
  return {
    type: actionType.SEARCH_USER_LIST_SUCCESS,
    userList: userList,
  };
};

export const searchUserListFailure = (error) => {
  return {
    type: actionType.SEARCH_USER_LIST_FAILURE,
    error: error,
  };
};

export const searchUserList = (group, keyword) => {
  return async (dispatch) => {
    try {
      dispatch(searchUserListStart());
      let url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${group}`;
      if (keyword) {
        url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${group}&tuKhoa=${keyword}`;
      }
      const result = await axios.get(url);
      dispatch(searchUserListSuccess(result.data));
    } catch (error) {
      dispatch(searchUserListFailure(error.response.data));
    }
  };
};

export const getInfoMySelf = () => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = `/QuanLyNguoiDung/ThongTinNguoiDung`;
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };

      const result = await axios({ method: "POST", url, headers });

      dispatch({
        type: actionType.USER_INFO,
        userInfo: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getListUserType = () => {
  return async (dispatch) => {
    try {
      const url = "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung";

      const result = await axios.get(url);

      dispatch({
        type: actionType.FETCH_LIST_USER_TYPE,
        userType: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const getAvailableCourseListSuccess = (availableCourses) => {
  return {
    type: actionType.FETCH_AVAILABLE_COURSE_LIST_SUCCESS,
    availableCourses: availableCourses,
  };
};

export const getAvailableCourseListFailure = (error) => {
  return {
    type: actionType.FETCH_AVAILABLE_COURSE_LIST_FAILURE,
    error: error,
  };
};

export const getAvailableCourseList = (account) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${account}`;
      if (account === null) {
        let newAccount = user.taiKhoan;
        url = `/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${newAccount}`;
      }
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const result = await axios({ method: "POST", url, headers });
      dispatch(getAvailableCourseListSuccess(result.data));
    } catch (error) {
      dispatch(getAvailableCourseListFailure(error.response.data));
    }
  };
};

export const courseEnrollmentSuccess = (courseEnrollment) => {
  return {
    type: actionType.COURSE_ENROLLMENT_SUCCESS,
    courseEnrollment: courseEnrollment,
  };
};

export const courseEnrollmentFailure = (error) => {
  return {
    type: actionType.COURSE_ENROLLMENT_FAILURE,
    error: error,
  };
};

export const courseEnrollment = (courseType, account) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = `/QuanLyKhoaHoc/GhiDanhKhoaHoc`;
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        maKhoaHoc: courseType,
        taiKhoan: account,
      };
      const result = await axios({ method: "POST", url, headers, data });
      dispatch(courseEnrollmentSuccess(result.data));
      dispatch(getAvailableCourseList(account));
      dispatch(getListCourseApproval(account));
      dispatch(getListCourseApproved(account));
    } catch (error) {
      dispatch(courseEnrollmentFailure(error.response.data));
    }
  };
};

export const getListCourseApprovalSuccess = (courseApproval) => {
  return {
    type: actionType.FETCH_LIST_COURSE_APPROVAL_SUCCESS,
    courseApproval: courseApproval,
  };
};

export const getListCourseApprovalFailure = (error) => {
  return {
    type: actionType.FETCH_LIST_COURSE_APPROVAL_FAILURE,
    error: error,
  };
};

export const getListCourseApproval = (account) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = "/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        taiKhoan: account,
      };

      const result = await axios({ method: "POST", url, headers, data });

      dispatch(getListCourseApprovalSuccess(result.data));
    } catch (error) {
      dispatch(getListCourseApprovalFailure(error.response.data));
    }
  };
};

export const getListCourseApprovedSuccess = (courseApproved) => {
  return {
    type: actionType.FETCH_LIST_COURSE_APPROVED_SUCCESS,
    courseApproved: courseApproved,
  };
};

export const getListCourseApprovedFailure = (error) => {
  return {
    type: actionType.FETCH_LIST_COURSE_APPROVED_FAILURE,
    error: error,
  };
};

export const getListCourseApproved = (account) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        taiKhoan: account,
      };
      const result = await axios({ method: "POST", url, headers, data });
      dispatch(getListCourseApprovedSuccess(result.data));
    } catch (error) {
      dispatch(getListCourseApprovedFailure(error.response.data));
    }
  };
};

export const deleteUserSuccess = (success) => {
  return {
    type: actionType.DELETE_USER_SUCCESS,
    success: success,
  };
};

export const deleteUserFailure = (error) => {
  return {
    type: actionType.DELETE_USER_FAILURE,
    error: error,
  };
};

export const deleteUser = (account, group, keyword) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`;
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };
      const data = {
        taiKhoan: account,
      };
      const reuslt = await axios({ method: "DELETE", url, headers, data });
      dispatch(deleteUserSuccess(reuslt?.data));
      dispatch(getUserList(group, keyword));
    } catch (error) {
      dispatch(deleteUserFailure(error.response.data));
    }
  };
};

export const updateUserInfo = (infoUser) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = "/QuanLyNguoiDung/CapNhatThongTinNguoiDung";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };

      const data = {
        taiKhoan: infoUser.taiKhoan,
        matKhau: infoUser.matKhau,
        hoTen: infoUser.hoTen,
        soDT: infoUser.soDT,
        maLoaiNguoiDung: infoUser?.maLoaiNguoiDung,
        maNhom: infoUser.maNhom,
        email: infoUser.email,
      };

      const result = await axios({ method: "PUT", url, headers, data });

      dispatch({
        type: actionType.UPDATE_USER_INFO,
        updateUser: result.data,
      });
      dispatch(getUserList(infoUser.maNhom));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const addUserMange = (infoUSer) => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(localStorage.getItem("account"));
      let url = "/QuanLyNguoiDung/ThemNguoiDung";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      };

      const data = {
        taiKhoan: infoUSer.taiKhoan,
        matKhau: infoUSer.matKhau,
        hoTen: infoUSer.hoTen,
        soDT: infoUSer.soDT,
        maLoaiNguoiDung: infoUSer.maLoaiNguoiDung,
        maNhom: infoUSer.maNhom,
        email: infoUSer.email,
      };

      const result = await axios({ method: "POST", url, headers, data });

      dispatch({
        type: actionType.ADD_USER,
        addUser: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
