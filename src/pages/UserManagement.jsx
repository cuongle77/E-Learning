import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddSharp, IoShieldCheckmark } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import FilterGroup from "../components/FilterGroup";
import {
  // getUserList,
  getListUserType,
  getAvailableCourseList,
  courseEnrollment,
  getListCourseApproval,
  getListCourseApproved,
  deleteUser,
  searchUserList,
  updateUserInfo,
  addUserMange,
} from "../store/actions/user-manage";
import DropDownUserManage from "../components/DropDownUserManage";
import { CancellingCourseEnroll } from "../store/actions/courses";

const UserManagement = () => {
  const [group, setGroup] = useState("GP08");
  const [infoUser, setInfoUser] = useState({
    taiKhoan: null,
    matKhau: null,
    hoTen: null,
    soDT: null,
    maLoaiNguoiDung: null,
    maNhom: null,
    email: null,
    index: null,
  });
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [addUser, setAddUser] = useState(false);

  const [disable, setDisable] = useState({});
  const dispatch = useDispatch();

  const {
    userList,
    userType,
    courseApproval,
    courseApproved,
    availableCourses,
  } = useSelector((state) => state.userManagementReducer);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(searchUserList(group, value));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInfoUser({
      ...infoUser,
      [name]: value,
    });
  };

  const enrollHandler = (courseType, account = infoUser?.taiKhoan) => {
    dispatch(courseEnrollment(courseType, account));
  };

  const viewUserHandler = (user, index) => {
    setInfoUser({
      taiKhoan: user?.taiKhoan,
      hoTen: user?.hoTen,
      email: user?.email,
      soDT: user?.soDt,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
      index: index + 1,
    });

    setShow(true);
    setEditUser(false);
    setAddUser(false);
    setDisable({ disabled: "disabled" });
    dispatch(getListCourseApproval(user?.taiKhoan));
    dispatch(getListCourseApproved(user?.taiKhoan));
    dispatch(getAvailableCourseList(user?.taiKhoan));
    dispatch(getListUserType());
  };

  const handleCancelCourse = (codeCourrse, account = infoUser?.taiKhoan) => {
    dispatch(CancellingCourseEnroll(codeCourrse, account));
  };

  const editUserHandler = (user) => {
    setInfoUser({
      taiKhoan: user?.taiKhoan,
      matKhau: user?.matKhau,
      soDT: user?.soDt,
      hoTen: user?.hoTen,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
      maNhom: group,
      email: user?.email,
      index: null,
    });
    setEditUser(true);
    setShow(true);
    setAddUser(false);
    setDisable({});
    dispatch(getListUserType());
  };

  const addUserHandler = () => {
    setShow(true);
    setAddUser(true);
    setEditUser(false);
    setDisable({});
    dispatch(getListUserType());
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (editUser) {
      dispatch(updateUserInfo(infoUser));
    }

    if (addUser) {
      dispatch(addUserMange(infoUser));
    }
  };

  const deleteUserHandler = (account, groupParent = group) => {
    dispatch(deleteUser(account, groupParent, null));
  };

  const totalUser = userList.reduce((total, user, index) => {
    return (total = index + 1);
  }, 0);

  useEffect(() => {
    dispatch(searchUserList(group, null));
  }, [dispatch, group]);

  return (
    <div className="user__management">
      <div className="grid">
        <div className="row">
          <div className="col l-6">
            <div className="user__wrap">
              <div className="user__header">
                <div className="header__top">
                  <button
                    className="icon__add"
                    title="Add"
                    onClick={addUserHandler}
                  >
                    <IoAddSharp />
                  </button>

                  <p>
                    <IoShieldCheckmark />
                    {totalUser} users was found!
                  </p>

                  <div className="filter">
                    <div className="item filter__group">
                      <FilterGroup group={group} setGroup={setGroup} />
                    </div>
                  </div>
                </div>

                <div className="header__bottom">
                  <input
                    type="text"
                    placeholder="Search User...."
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="user__render">
                <div className="user__render-content">
                  <ul className="user__list">
                    {userList?.map((user, index) => {
                      return (
                        <li key={index} className="item">
                          <div className="item__content">
                            <div
                              className="item__left"
                              onClick={() => viewUserHandler(user, index)}
                            >
                              <div className="user__img">
                                {index > 69 ? (
                                  <p>
                                    <FaUserAlt />
                                  </p>
                                ) : (
                                  <img
                                    src={
                                      index > 69
                                        ? null
                                        : `https://i.pravatar.cc/150?img=${
                                            index + 1
                                          }`
                                    }
                                    alt=""
                                  />
                                )}

                                {user?.maLoaiNguoiDung === "GV" ? (
                                  <span>{user?.maLoaiNguoiDung}</span>
                                ) : null}
                              </div>
                              <div className="user__name-contact">
                                <p>
                                  {user?.taiKhoan}
                                  <span>{user?.email}</span>
                                </p>
                              </div>
                            </div>

                            <div className="item__right">
                              <button onClick={() => editUserHandler(user)}>
                                <MdEdit />
                              </button>
                              <button
                                onClick={() =>
                                  deleteUserHandler(user?.taiKhoan)
                                }
                              >
                                <IoMdTrash />
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col l-6">
            <div
              className={
                editUser || addUser ? "user__info hidden" : "user__info"
              }
              style={
                show
                  ? { opacity: "1", visibility: "visible" }
                  : { opacity: "0", overflow: "hidden" }
              }
            >
              <div
                className="row"
                style={
                  editUser || addUser ? { justifyContent: "center" } : null
                }
              >
                <div
                  className="col l-8"
                  style={editUser || addUser ? { display: "none" } : null}
                >
                  <div className="user__info-left">
                    <div className="avartar">
                      {infoUser?.index < 69 ? (
                        <img
                          src={`https://i.pravatar.cc/150?img=${infoUser?.index}`}
                          alt=""
                        />
                      ) : (
                        <p>
                          <FaUserAlt />
                        </p>
                      )}
                      <span>{infoUser?.taiKhoan}</span>
                    </div>
                    <div className="user__course-register">
                      <DropDownUserManage
                        title="Pending Courses"
                        description="Need approve to allow the user accessing"
                        data={courseApproval}
                        indexParent={1}
                        enrollHandler={enrollHandler}
                        handleCancelCourse={handleCancelCourse}
                      />

                      <DropDownUserManage
                        title="Approved Courses"
                        description="The courses have already accessed by user"
                        data={courseApproved}
                        indexParent={2}
                        handleCancelCourse={handleCancelCourse}
                      />

                      <DropDownUserManage
                        enrollHandler={enrollHandler}
                        title="Available Courses"
                        description="Registing a course quickly for user"
                        data={availableCourses}
                        indexParent={3}
                      />
                    </div>
                  </div>
                </div>
                <div className="col l-4">
                  <div className="user__info-right">
                    <h4
                      style={
                        editUser || addUser
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {editUser ? "Edit User" : "Add User"}
                    </h4>
                    <form
                      action="#"
                      className="view__form"
                      onSubmit={onSubmitHandler}
                    >
                      <div className="form__field">
                        <label htmlFor="">Username</label>
                        <input
                          type="text"
                          name="taiKhoan"
                          disabled={editUser}
                          value={infoUser?.taiKhoan || ""}
                          onChange={onChangeHandler}
                          {...disable}
                        />
                      </div>

                      <div
                        className="form__field"
                        style={
                          editUser || addUser
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <label htmlFor="">Password</label>
                        <input
                          type="password"
                          name="matKhau"
                          value={infoUser?.matKhau || ""}
                          onChange={onChangeHandler}
                        />
                      </div>

                      <div className="form__field">
                        <label htmlFor="">Email</label>
                        <input
                          type="text"
                          name="email"
                          value={infoUser?.email || ""}
                          onChange={onChangeHandler}
                          {...disable}
                        />
                      </div>

                      <div className="form__field">
                        <label htmlFor="">Account Type</label>
                        <select
                          name="maLoaiNguoiDung"
                          id=""
                          value={infoUser?.maLoaiNguoiDung || ""}
                          onChange={onChangeHandler}
                          {...disable}
                        >
                          <option>Account Type </option>
                          {userType?.map((user, index) => {
                            return (
                              <option key={index} value={user?.maLoaiNguoiDung}>
                                {user?.tenLoaiNguoiDung}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form__field">
                        <label htmlFor="">Name</label>
                        <input
                          type="text"
                          name="hoTen"
                          value={infoUser?.hoTen || ""}
                          onChange={onChangeHandler}
                          {...disable}
                        />
                      </div>
                      <div className="form__field">
                        <label htmlFor="">Phone</label>
                        <input
                          type="text"
                          name="soDT"
                          value={infoUser?.soDT || ""}
                          onChange={onChangeHandler}
                          {...disable}
                        />
                      </div>
                      <div
                        className="form__field"
                        style={
                          editUser || addUser
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <label htmlFor="">Choose Group</label>
                        <select
                          name="group"
                          id=""
                          disabled={editUser}
                          value={infoUser?.maNhom || ""}
                          onChange={onChangeHandler}
                        >
                          <option>Choose Group</option>
                          <option value={"GP01"}>Group 1</option>
                          <option value={"GP02"}>Group 2</option>
                          <option value={"GP03"}>Group 3</option>
                          <option value={"GP04"}>Group 4</option>
                          <option value={"GP05"}>Group 5</option>
                          <option value={"GP06"}>Group 6</option>
                          <option value={"GP07"}>Group 7</option>
                          <option value={"GP08"}>Group 8</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        style={
                          editUser || addUser
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
