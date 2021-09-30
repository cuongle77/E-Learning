import * as actionType from "../actions/actionTypes";

const initialState = {
  course: null,
};

export const courseManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COURSE_INFO: {
      state.course = action.course;
      return { ...state };
    }

    case actionType.UPDATE_COURSE: {
      console.log(action);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
