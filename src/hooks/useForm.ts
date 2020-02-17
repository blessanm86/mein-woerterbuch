import { useReducer, ChangeEventHandler, ChangeEvent } from "react";

export interface InputInterface {
  name: string;
  type: "text" | "password" | "email" | "select";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ label: string; value: string }>;
  value: string;
}

interface OptionsInterface {
  reducer?: Function;
  validator?: Function;
}

interface FormInterface {
  state: InputInterface[];
  isValid: boolean;
  change: ChangeEventHandler;
  reset: Function;
}

export interface ActionInterface {
  type: string;
  name?: string;
  value?: string;
}

function useForm(
  inputs: InputInterface[],
  options: OptionsInterface = {}
): FormInterface {
  function change(
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const {
      target: { name, value }
    } = evt;
    dispatch({ type: "edit", name, value });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  function validator(inputs: InputInterface[]) {
    return !inputs.some(input => {
      if (input.required && !input.value) {
        return true;
      }

      return false;
    });
  }

  function reducer(
    state: FormInterface,
    action: ActionInterface
  ): FormInterface {
    const { state: inputs } = state;
    const { type, name, value } = action;

    if (type === "reset") return INITIAL_STATE;

    const index = inputs.findIndex(input => input.name === name);
    const newInputs = [
      ...inputs.slice(0, index),
      { ...inputs[index], value },
      ...inputs.slice(index + 1)
    ];

    const finalInputs = customReducer
      ? customReducer(newInputs, action)
      : newInputs;
    const isValid = customValidator
      ? customValidator(finalInputs)
      : validator(finalInputs);

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
