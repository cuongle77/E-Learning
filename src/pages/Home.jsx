import React, { useState } from "react";
import Hero from "../components/Hero";
import MainWrapper from "../components/MainWrapper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SuggestedCourse from "../components/SuggestedCourse";
import Loading from "../components/Loading";

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  const handleShowFullSidebar = (e) => {
    return !isShow ? setIsShow(true) : setIsShow(false);
  };

  return (
    <div className="home">
      <Loading />
      <Navbar handleShowFullSidebar={handleShowFullSidebar} />
      <Sidebar isShow={isShow} />

      <MainWrapper className={isShow ? "main change" : "main"}>
        <Hero />

        <div className="home__wrapper">
          <SuggestedCourse />
        </div>
      </MainWrapper>
    </div>
  );
};

export default Home;
