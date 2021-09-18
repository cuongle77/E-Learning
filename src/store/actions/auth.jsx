import axios from "../../settings/axios";
import * as actionType from "../actions/actionTypes";

export const LoginAction = (values) => {
  return async (dispatch) => {
    try {
      let url = "/QuanLyNguoiDung/DangNhap";
      let authData = {
        taiKhoan: values.username,
        matKhau: values.password,
      };

      const result = await axios.post(url, authData);

      localStorage.setItem("user", JSON.stringify(result.data));

      dispatch({
        type: actionType.LOGIN,
        data: result.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
