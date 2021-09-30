import React, { useState, useCallback } from "react";
import { BiChevronDown } from "react-icons/bi";
import { IoShareSocial, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

const CourseItem = ({ item, index }) => {
  const [isShow, setIsShow] = useState(false);
  const [indexTab, setIndexTab] = useState(0);

  const handleShowInfo = useCallback(
    (index) => {
      if (!isShow) {
        setIsShow(true);
        setIndexTab(index);
      } else {
        setIsShow(false);
      }
    },
    [isShow]
  );

  return (
    <div className="course__item">
      <Link to={`/detail/${item?.maKhoaHoc}`} className="item__top">
        <div
          className="item__img"
          style={{ backgroundImage: `url(${item?.hinhAnh})` }}
        ></div>

        <div className="item__info">
          <h4>{item?.tenKhoaHoc}</h4>

          <p>
            {item?.luotXem} <span>views</span>
          </p>
        </div>
      </Link>
      <div className="item__bottom">
        <button className="btn__using">
          <IoShareSocial className="icon__child" />
        </button>
        <button className="btn__using btn__heart">
          <IoHeart className="icon__child" />
        </button>
        <button
          className="btn__using btn__right"
          onClick={() => handleShowInfo(index)}
        >
          <BiChevronDown
            className={
              isShow && index === indexTab ? "icon__child add" : "icon__child"
            }
          />
        </button>
      </div>
      <div
        className={
          isShow && index === indexTab ? "item__more show" : "item__more"
        }
      >
        <p>{item?.moTa}</p>
      </div>
    </div>
  );
};

export default CourseItem;
