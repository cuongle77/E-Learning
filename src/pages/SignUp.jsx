import React from "react";
import { Link } from "react-router-dom";
import content from "../static";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignUp = () => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().min(5),
    confirm_password: yup.string().required().min(5),
    name: yup.string().required(),
    phone: yup
      .number()
      .min(10, "Phone number must be at least 10 characters")
      .required("Must enter a phone number"),
    email: yup.string().required().email(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (data) => {
    console.log(data);
  };
  return (
    <div className="user__join login">
      <div className="user__join__content">
        <h2>Sign Up</h2>
        <form
          action=""
          className="form form__login"
          onSubmit={handleSubmit(handleRegister)}
        >
          {content.form.register?.map((input, index) => {
            return (
              <div className="form__field" key={index}>
                {index === 5 ? (
                  ""
                ) : (
                  <>
                    <label htmlFor="" className="form-label">
                      {input.label}
                    </label>
                    <input
                      type={input.type}
                      className="form__input"
                      name={input.name}
                      {...register(input.name)}
                    />
                    {errors[input.name]?.message && (
                      <span>{errors.message}</span>
                    )}
                  </>
                )}

                {index === 5 ? (
                  <select name="" id="" className="form__field-select">
                    {input.select?.map((item, subIndex) => {
                      return (
                        <option value={item.value} key={subIndex}>
                          {item.group}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  ""
                )}
              </div>
            );
          })}

          <button className="btn__submit">Confirm</button>
        </form>

        <p className="account__text-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
