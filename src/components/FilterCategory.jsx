import React from "react";

const FilterCategory = ({ tabsCategory, setCode, code }) => {
  return (
    <select
      name=""
      id=""
      value={code}
      onChange={(e) => setCode(e.target.value)}
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
