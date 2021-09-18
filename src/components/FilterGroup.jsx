import React from "react";

const FilterGroup = ({ setGroup, group }) => {
  return (
    <select
      name=""
      id=""
      onChange={(e) => setGroup(e.target.value)}
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
    </select>
  );
};

export default FilterGroup;
