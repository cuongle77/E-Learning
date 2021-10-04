import React, { useState } from "react";
import { Route } from "react-router";
import MainWrapper from "../components/MainWrapper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminTemplate = (props) => {
  const { Component, isAdmin, ...restRoute } = props;
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
            {isAdmin ? (
              <>
                <Navbar handleShowFullSidebar={handleShowFullSidebar} />
                <MainWrapper className="main">
                  <Sidebar isShow={isShow} />

                  <div className="wrapper">
                    <div className="home__content">
                      <Component {...propsRoute} />
                    </div>
                  </div>
                </MainWrapper>
              </>
            ) : null}
          </>
        );
      }}
    />
  );
};

export default AdminTemplate;
