import * as actionType from "../actions/actionTypes";

const initialState = {
  login: false,
  error: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN: {
      let userAccount = {
        accessToken: action.data.accessToken,
        account: action.data.taiKhoan,
      };

      return { ...state, ...userAccount };
    }

    default:
      return { ...state };
  }
};
