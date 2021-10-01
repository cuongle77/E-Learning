import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  IoCheckmark,
  IoPencil,
  IoAlertCircle,
  IoPricetagSharp,
  IoRibbonSharp,
} from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { CourseEnroll, fetCourseDetails } from "../store/actions/courses";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CourseDetails = (props) => {
  const dataTabs = [
    {
      name: "Overview",
      icon: IoAlertCircle,
    },
    {
      name: "Curriculum",
      icon: IoRibbonSharp,
    },
    {
      name: "FAG",
      icon: IoPricetagSharp,
    },
    {
      name: "Announcement",
      icon: IoAlertCircle,
    },
    {
      name: "Reviews",
      icon: IoAlertCircle,
    },
  ];
  const secondExample = {
    size: 20,
    count: 5,
    color: "#999",
    activeColor: "#ff8906",
    value: 4,
    a11y: true,
    isHalf: true,
  };
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const { courseDetails } = useSelector((state) => state.courseReducer);
  const dataContent = [
    {
      itemChild: [
        {
          title: "Description",
          contentText:
            "Description Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam eratvolutpat. Ut wisi enim ad minim laoreet dolore magnaaliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci",
        },
        {
          title: "What You’ll Learn",
          contentChildItem: [
            {
              itemChild: [
                { icon: IoCheckmark, text: "Setting up the environment" },
                { icon: IoCheckmark, text: "Setting up the environment" },
                { icon: IoCheckmark, text: "Setting up the environment" },
                { icon: IoCheckmark, text: "Setting up the environment" },
              ],
            },
            {
              itemChild: [
                { icon: IoCheckmark, text: "Setting up the environment" },
                { icon: IoCheckmark, text: "Setting up the environment" },
                { icon: IoCheckmark, text: "Setting up the environment" },
                { icon: IoCheckmark, text: "Setting up the environment" },
              ],
            },
          ],
        },
        {
          title: "Requirements",
          contentChildLearn: [
            {
              icon: IoPencil,
              text: "Any computer will work: Windows, macOS or Linux",
            },
            {
              icon: IoPencil,
              text: "Any computer will work: Windows, macOS or Linux",
            },
            {
              icon: IoPencil,
              text: "Any computer will work: Windows, macOS or Linux",
            },
          ],
        },
        {
          title: "Here Is Exactly What We Cover In This Course:",
          contentText:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
        },
      ],
    },
    {
      content: "Curriculum",
    },
    { content: "FAQ" },
    { content: "Announcement" },
    { content: "Reviews" },
  ];
  const account = JSON.parse(localStorage.getItem("account"));

  let { id } = props.match.params;
  useEffect(() => {
    dispatch(fetCourseDetails(id));
  }, [dispatch, id]);

  const handleEnroll = () => {
    dispatch(CourseEnroll(courseDetails?.maKhoaHoc, account.taiKhoan));
  };

  return (
    <>
      <div className="course__details">
        <div className="grid">
          <div className="row" style={{ flexWrap: "wrap-reverse" }}>
            <div className="col l-8">
              <div className="course__details-description">
                <div className="course__info">
                  <h2>{courseDetails?.tenKhoaHoc}</h2>
                  <p>{courseDetails?.moTa}</p>
                  <ReactStars classNames="hello" {...secondExample} />
                  <div className="course__creator">
                    <p>
                      Created by <span>{courseDetails?.nguoiTao?.hoTen}</span>
                    </p>
                    <p>Last updated {courseDetails?.ngayTao}</p>
                  </div>
                </div>

                <div className="info__more">
                  <div className="info__tab">
                    {dataTabs.map((item, index) => {
                      return (
                        <button
                          key={index}
                          className={
                            tabIndex === index ? "tab__item add" : "tab__item"
                          }
                          onClick={() => setTabIndex(index)}
                        >
                          <item.icon /> {item.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className="info__wrap">
                    <div className="info__content">
                      {dataContent?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              tabIndex === index
                                ? "info__item show"
                                : "info__item"
                            }
                          >
                            {item.itemChild?.map((subItem, subIndex) => {
                              return (
                                <div key={subIndex} className="item__block">
                                  <h4>{subItem.title}</h4>
                                  <p>{subItem.contentText}</p>

                                  <div className="list__wrap">
                                    {subItem.contentChildItem?.map(
                                      (subIconCheck, indexCheck) => {
                                        return (
                                          <div
                                            key={indexCheck}
                                            className="list__item"
                                          >
                                            {subIconCheck.itemChild?.map(
                                              (icon, iconIds) => {
                                                return (
                                                  <p key={iconIds}>
                                                    <icon.icon />
                                                    {icon.text}
                                                  </p>
                                                );
                                              }
                                            )}
                                          </div>
                                        );
                                      }
                                    )}
                                    <div className="list__required">
                                      {subItem.contentChildLearn?.map(
                                        (iconLearn, indexLearn) => {
                                          return (
                                            <p key={indexLearn}>
                                              <iconLearn.icon />
                                              {iconLearn.text}
                                            </p>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                            <p
                              style={
                                index === 0
                                  ? { display: "none" }
                                  : { display: "block" }
                              }
                            >
                              {item.content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l-4">
              <div className="course__details-block">
                <div className="block__item">
                  <div
                    className="item__img"
                    style={{
                      backgroundImage: `url(${courseDetails?.hinhAnh})`,
                    }}
                  >
                    <div className="img__avarta">
                      <img src="https://i.pravatar.cc/300" alt="" />
                    </div>
                  </div>
                  <div className="item__content">
                    <h4>Free 0%</h4>

                    {account ? (
                      <button onClick={handleEnroll}>Enroll now</button>
                    ) : (
                      <Link className="go_login" to="/login">
                        Login to enroll
                      </Link>
                    )}

                    <div className="item__overview">
                      <h4>This course includes:</h4>
                      <ul>
                        <li>
                          <MdHelpOutline /> 26.5 hours on-demand video
                        </li>
                        <li>
                          <MdHelpOutline /> 13 articles
                        </li>
                        <li>
                          <MdHelpOutline />1 downloadable resource
                        </li>
                        <li>
                          <MdHelpOutline />
                          26.5 hours on-demand video
                        </li>
                        <li>
                          <MdHelpOutline /> 1 practice test
                        </li>
                        <li>
                          <MdHelpOutline />
                          Full lifetime access
                        </li>
                        <li>
                          <MdHelpOutline />
                          Access on mobile and TV
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
