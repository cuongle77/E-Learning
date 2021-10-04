import * as actionType from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  isError: null,
  errorMessage: null,
  success: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START: {
      return { ...state };
    }

    case actionType.AUTH_SUCCESS: {
      return {
        ...state,
        isLogin: action.isLogin,
        isError: action.isError,
        errorMessage: null,
        success: action.message,
      };
    }

    case actionType.AUTH_FAILURE: {
      return {
        ...state,
        isLogin: action.isLogin,
        isError: action.isError,
        errorMessage: action.error,
      };
    }

    default:
      return { ...state };
  }
};
