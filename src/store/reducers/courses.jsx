import * as actionType from "../actions/actionTypes";

const initialState = {
  courses: null,
  tabsCategory: null,
  courseCategory: null,
  categoryCode: "BackEnd",
  courseDetails: null,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FETCH_COURSES: {
      [...state.courses] = [...action.courses];
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

    default:
      return { ...state };
  }
};
