import { applyMiddleware, combineReducers, createStore } from "redux";
import { courseReducer } from "./reducers/courses";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  courseReducer,
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));
