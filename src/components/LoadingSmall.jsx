import React from "react";

const LoadingSmall = () => {
  return (
    <div className="loading__small">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSmall;
