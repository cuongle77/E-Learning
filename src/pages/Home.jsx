import React, { useState } from "react";
import Hero from "../components/Hero";
import MainWrapper from "../components/MainWrapper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SuggestedCourse from "../components/SuggestedCourse";

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  const handleShowFullSidebar = (e) => {
    return !isShow ? setIsShow(true) : setIsShow(false);
  };

  return (
    <div className="home">
      <Navbar handleShowFullSidebar={handleShowFullSidebar} />

      <MainWrapper className="main">
        <Sidebar isShow={isShow} />

        <div className="wrapper">
          <div className="home__content">
            <Hero />
            <SuggestedCourse />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default Home;
