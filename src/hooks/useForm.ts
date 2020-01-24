import { useReducer } from "react";

function useForm(inputs: Array<Object>, options = {}) {
  function change(evt) {
    const {
      target: { name, value }
    } = evt;
    dispatch({ type: "edit", name, value });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  function validator(inputs) {
    return !inputs.some(input => {
      if (input.required && !input.value) {
        return true;
      }

      return false;
    });
  }

  function reducer(state, action) {
    const { state: inputs } = state;
    const { type, name, value } = action;

    if (type === "reset") return INITIAL_STATE;

    const index = inputs.findIndex(input => input.name === name);
    const newInputs = [...inputs.slice(0, index), { ...inputs[index], value }, ...inputs.slice(index + 1)];

    const finalInputs = customReducer ? customReducer(newInputs, action) : newInputs;
    const isValid = customValidator ? customValidator(finalInputs) : validator(finalInputs);

    return { ...state, state: finalInputs, isValid };
  }

  if (!inputs) throw new Error("Must pass in an array of inputs");

  const { reducer: customReducer, validator: customValidator } = options;
  const INITIAL_STATE = {
    state: inputs,
    isValid: false,
    change,
    reset
  };
  const reducerFn = customReducer ? customReducer : reducer;
  const [state, dispatch] = useReducer(reducerFn, INITIAL_STATE);
  return state;
}

export default useForm;
