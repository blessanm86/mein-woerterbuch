import { useReducer, ChangeEvent } from "react";

interface Input {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: string }>;
  value: string;
}

interface Options {
  reducer?: Function;
  validator?: Function;
}

interface State {
  state: Array<Input>;
  isValid: boolean;
  change: Function;
  reset: Function;
}

interface Action {
  type: string;
  name?: string;
  value?: string;
}

function useForm(inputs: Array<Input>, options: Options = {}) {
  function change(evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const {
      target: { name, value }
    } = evt;
    dispatch({ type: "edit", name, value });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  function validator(inputs: Array<Input>) {
    return !inputs.some(input => {
      if (input.required && !input.value) {
        return true;
      }

      return false;
    });
  }

  function reducer(state: State, action: Action): State {
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

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return state;
}

export default useForm;
