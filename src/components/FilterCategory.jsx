import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../store/actions/courses";
import * as actionType from "../store/actions/actionTypes";

const FilterCategory = ({ tabsCategory, setCode, code }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  return (
    <select
      name=""
      id=""
      value={code}
      onChange={(e) => {
        setCode(e.target.value);
        dispatch({
          type: actionType.CHOOSE_COURSE_TYPE,
        });
      }}
    >
      <option value="all">All Topic</option>
      {tabsCategory?.map((item, index) => {
        return (
          <option key={index} value={item.maDanhMuc}>
            {item.tenDanhMuc}
          </option>
        );
      })}
    </select>
  );
};

export default FilterCategory;
