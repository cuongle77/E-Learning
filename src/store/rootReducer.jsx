import { applyMiddleware, combineReducers, createStore } from "redux";
import { courseReducer } from "./reducers/courses";
import { courseManagementReducer } from "./reducers/course-management";
import { authReducer } from "./reducers/auth";
import { userManagementReducer } from "./reducers/user-management";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  courseReducer,
  authReducer,
  courseManagementReducer,
  userManagementReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
