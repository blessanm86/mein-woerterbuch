import React from "react";

import useForm from "../hooks/useForm";

const INITIAL_STATE = [
  {
    placeholder: "Email",
    type: "email",
    name: "email",
    value: "blessanm86@gmail.com",
    required: true
  },
  {
    placeholder: "Password",
    type: "password",
    name: "password",
    value: "",
    required: true
  }
];

function Login() {
  const [state, [onChange], isValid] = useForm(INITIAL_STATE);

  return (
    <section className="wb-login">
      {state.map(input => (
        <input {...input} key={input.name} onChange={onChange} />
      ))}
      <button disabled={!isValid}>Login</button>
    </section>
  );
}

export default Login;
