import * as actionType from "../actions/actionTypes";

const initialState = {
  tabsCategory: [],
  courseCategory: [],
  categoryCode: "BackEnd",
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return { ...state };
  }
};
