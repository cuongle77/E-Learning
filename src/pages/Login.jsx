import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import content from "../static";
import { LoginAction } from "../store/actions/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(5),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isError, errorMessage } = useSelector((state) => state.authReducer);

  const handleLogin = (data) => {
    dispatch(LoginAction(data, history));
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        className: "toast__error",
        theme: "colored",
      });
    }
  }, [isError, errorMessage]);

  return (
    <div className="user__join login">
      <div className="user__join__content">
        <h2>Login</h2>
        <form
          action=""
          className="form form__login"
          onSubmit={handleSubmit(handleLogin)}
        >
          {content.form.login?.map((input, index) => {
            return (
              <div className="form__field" key={index}>
                <label htmlFor={index} className="form-label">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  className="form__input"
                  name={input.name}
                  id={index}
                  {...register(input.name)}
                />
                {errors[input.name]?.message && (
                  <span>{errors[input.name]?.message}</span>
                )}
              </div>
            );
          })}

          <button className="btn__submit" type="submit">
            Login
          </button>
        </form>

        {/* <p className="account__text-link">
          Don't have an account? <NavLink to="/sign-up">Sign Up</NavLink>
        </p> */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
