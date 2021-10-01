import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const LoadingFullPage = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        !isLoading
      )}
    </>
  );
};

export default LoadingFullPage;
