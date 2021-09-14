import React, { useState } from "react";
import Hero from "../components/Hero";
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
      <Sidebar isShow={isShow} />

      <div className={isShow ? "main change" : "main"}>
        <Hero />

        <div className="home__wrapper">
          <SuggestedCourse />
        </div>
      </div>
    </div>
  );
};

export default Home;
