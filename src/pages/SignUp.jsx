import React from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="user__join login">
      <div className="user__join__content">
        <h2>Sign Up</h2>
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
          <div className="form__field">
            <input type="password" className="form__input" placeholder=" " />
            <label htmlFor="" className="form-label">
              Confirm Password
            </label>
          </div>
          <div className="form__field">
            <input type="text" className="form__input" placeholder=" " />
            <label htmlFor="" className="form-label">
              Name
            </label>
          </div>
          <div className="form__field">
            <input type="password" className="form__input" placeholder=" " />
            <label htmlFor="" className="form-label">
              Phone
            </label>
          </div>
          <div className="form__field">
            <select name="" id="" className="form__field-select">
              <option value="">Group 1</option>
              <option value="">Group 2</option>
              <option value="">Group 3</option>
              <option value="">Group 4</option>
              <option value="">Group 5</option>
              <option value="">Group 6</option>
              <option value="">Group 7</option>
              <option value="">Group 8</option>
            </select>
          </div>
          <div className="form__field">
            <input type="password" className="form__input" placeholder=" " />
            <label htmlFor="" className="form-label">
              Email
            </label>
          </div>

          <button className="btn__submit">Confirm</button>
        </form>

        <p className="account__text-link">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
