import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="user__join login">
      <div className="user__join__content">
        <h2>Login</h2>
        <form action="" className="form form__login">
          <div className="form__field">
            <input type="text" className="form__input" placeholder=" " />
            <label htmlFor="" className="form-label">
              Username
            </label>
          </div>
          <div className="form__field">
            <input type="password" className="form__input" placeholder=" " />
            <label htmlFor="" className="form-label">
              Password
            </label>
          </div>

          <button className="btn__submit">Login</button>
        </form>

        <p className="account__text-link">
          Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
