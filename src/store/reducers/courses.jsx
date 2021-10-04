import * as actionType from "../actions/actionTypes";

const initialState = {
  tabsCategory: null,
  courseCategory: null,
  categoryCode: "BackEnd",
  courses: null,
  courseDetails: null,
  userDetail: null,
  success: null,
  error: null,
  courseSearch: [],
  userCourse: null,
  loading: false,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_COURSES_START: {
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_COURSES_SUCCESS: {
      [...state.courses] = [...action.courses];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_COURSES_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.SEARCH_COURSE_START: {
      state.loading = true;
      return { ...state };
    }

    case actionType.SEARCH_COURSE_SUCCESS: {
      [...state.courseSearch] = [...action.courseSearch];
      state.loading = false;
      return { ...state };
    }

    case actionType.SEARCH_COURSE_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_CATEGORY_START: {
      return { ...state };
    }

    case actionType.FETCH_CATEGORY_SUCCESS: {
      [...state.tabsCategory] = [...action.tabsCategory];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_CATEGORY_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_COURSE_CATEGORY_START: {
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_COURSE_CATEGORY_SUCCESS: {
      [...state.courseCategory] = [...action.courseCategory];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_COURSE_CATEGORY_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_CATEGORY_CODE: {
      state.categoryCode = action.categoryCode;
      return { ...state };
    }

    case actionType.FETCH_COURSE_DETAILS_START: {
      return { ...state };
    }

    case actionType.FETCH_COURSE_DETAILS_SUCCESS: {
      state.courseDetails = action.courseDetails;
      return { ...state };
    }

    case actionType.FETCH_COURSE_DETAILS_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.COURSE_ENROLLED_SUCCESS: {
      state.success = action.success;
      return { ...state };
    }

    case actionType.COURSE_ENROLL_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.FETCH_INFO_ACCOUNT_USER_SUCCESS: {
      state.userDetail = { ...action.userDetail };
      return { ...state };
    }

    case actionType.FETCH_INFO_ACCOUNT_USER_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.CANCEL_COURSE_ENROLL_SUCCESS: {
      state.success = action.success;
      return { ...state };
    }

    case actionType.CANCEL_COURSE_ENROLL_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.FETCH_INFO_USER_COURSES_SUCCESS: {
      state.userCourse = { ...action.userCourse };
      return { ...state };
    }

    case actionType.FETCH_INFO_USER_COURSES_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.CHOOSE_COURSE_TYPE: {
      return { ...state };
    }

    case actionType.CHOOSE_GROUP: {
      return { ...state };
    }

    default:
      return { ...state };
  }
};
