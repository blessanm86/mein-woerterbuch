import React from "react";

import useForm from "../hooks/useForm";
import useFirebase from "../hooks/useFirebase";

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
  const [state, [onChange, reset], isValid] = useForm(INITIAL_STATE);
  const { loginToFirebase } = useFirebase();

  const login = () => {
    const { email, password } = state.reduce((prev, property) => {
      return {
        ...prev,
        [property.name]: property.value
      };
    }, {});
    loginToFirebase(email, password);
    reset();
  };

  return (
    <section className="wb-login">
      {state.map(input => (
        <input {...input} key={input.name} onChange={onChange} />
      ))}
      <button disabled={!isValid} onClick={login}>
        Login
      </button>
    </section>
  );
}

export default Login;
