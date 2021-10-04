import axios from "../../settings/axios";
import * as actionType from "../actions/actionTypes";

export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authFail = (error, { isLogin, isError }) => {
  return {
    type: actionType.AUTH_FAILURE,
    error: error,
    isLogin: isLogin,
    isError: isError,
  };
};

export const authSuccess = (authData, { isLogin, isError }, message) => {
  return {
    type: actionType.AUTH_SUCCESS,
    authData: authData,
    isLogin: isLogin,
    isError: isError,
    message: message,
  };
};

export const LoginAction = (values, history) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      let url = "/QuanLyNguoiDung/DangNhap";
      let authData = {
        taiKhoan: values.username,
        matKhau: values.password,
      };

      const result = await axios.post(url, authData);

      if (result.data) {
        dispatch(
          authSuccess(
            result.data,
            { isError: false, isLogin: true },
            "Login successfuly!"
          )
        );
        localStorage.setItem("account", JSON.stringify(result.data));
        history.push("/");
      }
    } catch (err) {
      dispatch(authFail(err.response.data, { isLogin: false, isError: true }));
      dispatch(authFail(err.response.data, { isLogin: false, isError: false }));
    }
  };
};

export const logout = () => {
  localStorage.removeItem("account");

  return {
    type: actionType.LOG_OUT,
  };
};
