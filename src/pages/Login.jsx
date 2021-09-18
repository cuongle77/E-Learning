import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [isLogin, setLogin] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...isLogin,
      [name]: value,
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="user__join login">
      <div className="user__join__content">
        <h2>Login</h2>
        <form action="" className="form form__login" onSubmit={submitHandle}>
          <div className="form__field">
            <input
              type="text"
              className="form__input"
              name="username"
              placeholder=" "
              onChange={handleChange}
            />
            <label htmlFor="" className="form-label">
              Username
            </label>
          </div>
          <div className="form__field">
            <input
              type="password"
              name="password"
              className="form__input"
              placeholder=" "
              onChange={handleChange}
            />
            <label htmlFor="" className="form-label">
              Password
            </label>
          </div>

          <button className="btn__submit" type="submit">
            Login
          </button>
        </form>

        <p className="account__text-link">
          Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
