import React from "react";

import useForm from "../hooks/useForm";
import useFirebase from "../hooks/useFirebase";

const INITIAL_STATE = [
  {
    placeholder: "Email",
    type: "email" as const,
    name: "email",
    value: "blessanm86@gmail.com",
    required: true
  },
  {
    placeholder: "Password",
    type: "password" as const,
    name: "password",
    value: "",
    required: true
  }
];

function Login() {
  const { state, isValid, change, reset } = useForm(INITIAL_STATE);
  const { loginToFirebase } = useFirebase();

  const login = () => {
    const { email, password } = state.reduce((prev, property) => {
      return {
        ...prev,
        [property.name]: property.value
      };
    }, {} as { email: string; password: string });
    loginToFirebase(email, password);
    reset();
  };

  return (
    <section className="wb-login">
      {state.map(input => (
        <input {...input} key={input.name} onChange={change} />
      ))}
      <button disabled={!isValid} onClick={login}>
        Login
      </button>
    </section>
  );
}

export default Login;
