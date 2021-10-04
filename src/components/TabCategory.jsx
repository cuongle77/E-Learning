import React, { useState, useCallback, useEffect } from "react";
import * as actionType from "../store/actions/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../store/actions/courses";

const TabCategory = () => {
  const [indexTab, setIndexTab] = useState(0);
  const { tabsCategory } = useSelector((state) => state.courseReducer);
  const dispatch = useDispatch();

  const handleTabs = useCallback(
    (item, index) => {
      dispatch({
        categoryCode: item,
        type: actionType.FETCH_CATEGORY_CODE,
      });
      setIndexTab(index);
    },

    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="tab__category">
      {tabsCategory?.map((item, index) => {
        return (
          <button
            key={index}
            className={indexTab === index ? "tab__btn current" : "tab__btn"}
            onClick={() => handleTabs(item.maDanhMuc, index)}
          >
            {item.tenDanhMuc}
          </button>
        );
      })}
    </div>
  );
};

export default TabCategory;
