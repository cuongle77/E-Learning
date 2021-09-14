import React, { Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import imgSlide1 from "../assets/images/bg-hero.jpg";
import imgSlide2 from "../assets/images/bg-hero2.jpg";
import imgSlide3 from "../assets/images/bg-hero5.jpg";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick__arrow arrow__right" onClick={onClick}>
      <BiChevronRight className="slick__arrow-icon" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick__arrow arrow__left" onClick={onClick}>
      <BiChevronLeft className="slick__arrow-icon" />
    </div>
  );
};

const Hero = () => {
  const config = {
    dots: false,
    lazyLoad: true,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    arrows: true,
    speed: 650,
    autoplaySpeed: 10000,
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const dataSllide = [
    {
      image: imgSlide1,
      bgColorTo: "118, 18, 255",
      bgColorRight: "5, 178, 255",
    },
    {
      image: imgSlide2,
      bgColorTo: "254, 33, 94",
      bgColorRight: "255, 148, 2",
    },
    {
      image: imgSlide3,
      bgColorTo: "0, 126, 254",
      bgColorRight: "6, 195, 254",
      bgMain: "#007efe",
    },
  ];

  return (
    <div className="hero">
      <Slider {...config}>
        {dataSllide.map((item, index) => {
          return (
            <Fragment key={index}>
              <div
                className="hero__content"
                style={{
                  backgroundImage: `linear-gradient(
                        to right,
                        rgba(${item.bgColorTo}, 0.9),
                        rgba(${item.bgColorRight}, 0.5)
                      ),
                      url(${item.image})`,
                }}
              >
                <div className="content__wrap">
                  <h2 className="title">
                    Welcome to
                    <p>The place where success begins.</p>
                    <span>You can find everything here</span>
                  </h2>
                  <button className="btn btn-go">Explore</button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </Slider>
    </div>
  );
};

export default Hero;
