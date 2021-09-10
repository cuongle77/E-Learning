import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [isShow, setIsShow] = useState(false);
  const handleShowFullSidebar = (e) => {
    return !isShow ? setIsShow(true) : setIsShow(false);
  };

  return (
    <>
      <Navbar handleShowFullSidebar={handleShowFullSidebar} />
      <Sidebar isShow={isShow} />
    </>
  );
};

export default Home;
