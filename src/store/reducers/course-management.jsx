import * as actionType from "../actions/actionTypes";

const initialState = {
  courseList: [],
  course: null,
  success: null,
  error: null,
  loading: false,
};

export const courseManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_COURSES_LIST_START: {
      state.loading = true;
      return { ...state };
    }

    case actionType.FETCH_COURSES_LIST_SUCCESS: {
      [...state.courseList] = [...action.courseList];
      state.loading = false;
      return { ...state };
    }

    case actionType.FETCH_COURSES_LIST_FAILURE: {
      state.error = action.error;
      state.loading = true;
      return { ...state };
    }

    case actionType.COURSE_INFO: {
      state.course = action.course;
      return { ...state };
    }

    case actionType.DELETE_COURSE_SUCCESS: {
      state.success = action.success;
      return { ...state };
    }

    case actionType.DELETE_COURSE_FAILURE: {
      state.error = action.error;
      return { ...state };
    }

    case actionType.UPDATE_COURSE: {
      return { ...state };
    }

    default:
      return { ...state };
  }
};
