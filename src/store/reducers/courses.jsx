import * as actionType from "../actions/actionTypes";

const initialState = {
  courses: null,
  tabsCategory: null,
  courseCategory: null,
  categoryCode: "BackEnd",
  courseDetails: null,
  userDetail: null,
  loading: false,
  myCourses: [],
  success: null,
  error: null,
  messageCancelCourse: null,
  courseSearch: [],
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_COURSES: {
      [...state.courses] = [...action.courses];
      return { ...state };
    }

    case actionType.SEARCH_COURSE: {
      [...state.courseSearch] = [...action.courseSearch];
      return { ...state };
    }

    case actionType.FETCH_CATEGORY: {
      [...state.tabsCategory] = [...action.tabsCategory];
      return { ...state };
    }

    case actionType.FETCH_COURSE_CATEGORY: {
      [...state.courseCategory] = [...action.courseCategory];
      return { ...state };
    }

    case actionType.FETCH_CATEGORY_CODE: {
      state.categoryCode = action.categoryCode;
      return { ...state };
    }

    case actionType.FETCH_COURSE_DETAILS: {
      state.courseDetails = action.courseDetails;
      return { ...state };
    }

    case actionType.SHOW_LOADER: {
      return { ...state, loading: true };
    }

    case actionType.HIDE_LOADER: {
      return { ...state, loading: false };
    }

    case actionType.FETCH_INFO_USER_COURSES: {
      return { ...state };
    }

    case actionType.FETCH_INFO_ACCOUNT_USER: {
      state.userDetail = { ...action.userDetail };
      return { ...state };
    }

    case actionType.COURSE_ENROLLED: {
      state.success = action.success;
      return { ...state };
    }

    case actionType.COURSE_ENROLL_FAIL: {
      state.error = action.err;
      console.log(action);
      return { ...state };
    }

    case actionType.CANCEL_COURSE_ENROLL: {
      state.messageCancelCourse = action.messageCancelCourse;
      return { ...state };
    }

    case actionType.DELETE_COURSE: {
      console.log(action);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
