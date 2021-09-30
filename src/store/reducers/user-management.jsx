import * as actionType from "../actions/actionTypes";

const initialState = {
  userList: [],
  userType: [],
  availableCourses: [],
  courseEnrollment: null,
  courseApproval: [],
  courseApproved: [],
};

export const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_USER_LIST: {
      [...state.userList] = [...action.userList];

      return { ...state };
    }

    case actionType.SEARCH_USER_LIST: {
      [...state.userList] = [...action.userList];

      return { ...state };
    }

    case actionType.FETCH_LIST_USER_TYPE: {
      [...state.userType] = [...action.userType];

      return { ...state };
    }

    case actionType.USER_INFO: {
      return { ...state };
    }

    case actionType.FETCH_AVAILABLE_COURSE_LIST: {
      [...state.availableCourses] = [...action.availableCourses];
      return { ...state };
    }

    case actionType.COURSE_ENROLLMENT: {
      state.courseEnrollment = action.courseEnrollment;
      return { ...state };
    }

    case actionType.FETCH_LIST_COURSE_APPROVAL: {
      [...state.courseApproval] = [...action.courseApproval];
      return { ...state };
    }

    case actionType.FETCH_LIST_COURSE_APPROVED: {
      [...state.courseApproved] = [...action.courseApproved];
      return { ...state };
    }

    case actionType.DELETE_USER: {
      return { ...state };
    }

    case actionType.UPDATE_USER_INFO: {
      return { ...state };
    }

    case actionType.ADD_USER: {
      console.log(action);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
