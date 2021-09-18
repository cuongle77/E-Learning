import { applyMiddleware, combineReducers, createStore } from "redux";
import { courseReducer } from "./reducers/courses";
import { authReducer } from "./reducers/auth";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  courseReducer,
  authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
