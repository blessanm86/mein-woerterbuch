import React, { useReducer } from "react";

const INITIAL_STATE = {
  email: "blessanm86@gmail.com",
  password: "",
  isValid: ""
};

function isValid(values) {
  return !values.some(value => !Boolean(value));
}

function reducer(state, action) {
  const { type, field, value } = action;

  if (type === "reset") return INITIAL_STATE;

  const newState = {
    ...state,
    [field]: value
  };

  const { email, password } = newState;

  return {
    ...newState,
    isValid: isValid([email, password])
  };
}

function Login() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { email, password, isValid } = state;

  const onChange = evt =>
    dispatch({ type: "edit", field: evt.target.name, value: evt.target.value });

  return (
    <section className="wb-login">
      <input
        placeholder="Email"
        name="email"
        type="email"
        value={email}
        onChange={onChange}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        value={password}
        onChange={onChange}
      />
      <button disabled={!isValid}>Login</button>
    </section>
  );
}

export default Login;
