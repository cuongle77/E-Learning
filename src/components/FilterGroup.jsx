import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../store/actions/courses";
import * as actionType from "../store/actions/actionTypes";
import { searchUserList } from "../store/actions/user-manage";

const FilterGroup = ({ setGroup, group, code, key, isPageUserManage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    isPageUserManage
      ? dispatch(searchUserList(group, null))
      : dispatch(fetchCourses(code, group, key));
  }, [dispatch, group, code, key, isPageUserManage]);

  return (
    <select
      onChange={(e) => {
        setGroup(e.target.value);
        dispatch({ type: actionType.CHOOSE_GROUP });
      }}
      value={group}
    >
      <option value="GP01">Group 1</option>
      <option value="GP02">Group 2</option>
      <option value="GP03">Group 3</option>
      <option value="GP04">Group 4</option>
      <option value="GP05">Group 5</option>
      <option value="GP06">Group 6</option>
      <option value="GP07">Group 7</option>
      <option value="GP08">Group 8</option>
      <option value="GP09">Group 9</option>
      <option value="GP10">Group 10</option>
      <option value="GP11">Group 11</option>
      <option value="GP12">Group 12</option>
    </select>
  );
};

export default FilterGroup;
