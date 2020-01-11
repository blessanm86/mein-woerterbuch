import { useReducer } from "react";

function useForm(inputs) {
  function onInputChange(evt) {
    const {
      target: { name, value }
    } = evt;
    dispatch({ type: "edit", name, value });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  function isValid(inputs) {
    return inputs.some(input => {
      if (input.required && !input.value) {
        return true;
      }

      return false;
    });
  }

  function reducer(state, action) {
    const [inputs] = state;
    const { type, name, value } = action;

    if (type === "reset") return INITIAL_STATE;

    const index = inputs.findIndex(input => input.name === name);
    const newInputs = [
      ...inputs.slice(0, index),
      { ...inputs[index], value },
      ...inputs.slice(index + 1)
    ];

    return [newInputs, [onInputChange, reset], !isValid(newInputs)];
  }

  const INITIAL_STATE = [inputs, [onInputChange, reset], false];

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return state;
}

export default useForm;
