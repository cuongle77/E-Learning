import axios from "../../settings/axios";
import * as actionType from "../actions/actionTypes";

export const getUserList = (group) => {
  return async (dispatch) => {
    try {
      let url = `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${group}`;

      const result = await axios.get(url);

      dispatch({
        type: actionType.FETCH_USER_LIST,
        userList: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const searchUserList = (group, keyword) => {
  return async (dispatch) => {
    try {
      let url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${group}`;

      if (keyword) {
        url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${group}&tuKhoa=${keyword}`;
      }

      const result = await axios.get(url);

      dispatch({
        type: actionType.SEARCH_USER_LIST,
        userList: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
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

export const getAvailableCourseList = (account) => {
  return async (dispatch) => {
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

    dispatch({
      type: actionType.FETCH_AVAILABLE_COURSE_LIST,
      availableCourses: result.data,
    });

    try {
    } catch (err) {
      console.log(err.response.data);
    }
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

      dispatch({
        type: actionType.COURSE_ENROLLMENT,
        courseEnrollment: result.data,
      });
      dispatch(getAvailableCourseList(account));
      dispatch(getListCourseApproval(account));
      dispatch(getListCourseApproved(account));
    } catch (err) {
      console.log(err.response.data);
    }
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

      dispatch({
        type: actionType.FETCH_LIST_COURSE_APPROVAL,
        courseApproval: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
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

      dispatch({
        type: actionType.FETCH_LIST_COURSE_APPROVED,
        courseApproved: result.data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
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

      dispatch({
        type: actionType.DELETE_USER,
        messageDelete: reuslt.data,
      });
      dispatch(getUserList(group, keyword));
    } catch (err) {
      alert(err.response.data);
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
