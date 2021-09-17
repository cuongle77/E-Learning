import React, { useState } from "react";
import { Route } from "react-router";
import MainWrapper from "../components/MainWrapper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomeTemplate = (props) => {
  const { Component, ...restRoute } = props;
  const [isShow, setIsShow] = useState(false);
  const handleShowFullSidebar = (e) => {
    return !isShow ? setIsShow(true) : setIsShow(false);
  };

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Navbar handleShowFullSidebar={handleShowFullSidebar} />
            <Sidebar isShow={isShow} />
            <MainWrapper className={isShow ? "main change" : "main"}>
              <Component {...propsRoute} />
            </MainWrapper>
          </>
        );
      }}
    />
  );
};

export default HomeTemplate;
