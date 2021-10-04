import * as actionType from "../actions/actionTypes";

const initialState = {
  userList: [],
  userType: [],
  availableCourses: [],
  courseEnrollment: null,
  courseApproval: [],
  courseApproved: [],
  success: "",
  error: "",
  loading: false,
};

export const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_USER_LIST_START: {
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_USER_LIST_SUCCESS: {
      [...state.userList] = [...action.userList];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_USER_LIST_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.SEARCH_USER_LIST_START: {
      state.loading = true;
      return { ...state };
    }

    case actionType.SEARCH_USER_LIST_SUCCESS: {
      [...state.userList] = [...action.userList];
      state.loading = false;
      return { ...state };
    }

    case actionType.SEARCH_USER_LIST_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_LIST_USER_TYPE: {
      [...state.userType] = [...action.userType];

      return { ...state };
    }

    case actionType.USER_INFO: {
      return { ...state };
    }

    case actionType.FETCH_AVAILABLE_COURSE_LIST_SUCCESS: {
      [...state.availableCourses] = [...action.availableCourses];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_AVAILABLE_COURSE_LIST_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.COURSE_ENROLLMENT_SUCCESS: {
      state.courseEnrollment = action.courseEnrollment;
      state.loading = false;
      return { ...state };
    }

    case actionType.COURSE_ENROLLMENT_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_LIST_COURSE_APPROVAL_SUCCESS: {
      [...state.courseApproval] = [...action.courseApproval];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_LIST_COURSE_APPROVAL_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_LIST_COURSE_APPROVED_SUCCESS: {
      [...state.courseApproved] = [...action.courseApproved];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_LIST_COURSE_APPROVED_FAILURE: {
      state.error = action.error;
      state.loading = false;
      return { ...state };
    }

    case actionType.DELETE_USER_SUCCESS: {
      state.success = action.success;
      return { ...state };
    }

    case actionType.DELETE_USER_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.UPDATE_USER_INFO: {
      return { ...state };
    }

    case actionType.ADD_USER: {
      return { ...state };
    }

    default:
      return { ...state };
  }
};
