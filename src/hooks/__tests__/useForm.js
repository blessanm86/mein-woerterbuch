import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "../useForm";

describe("Hooks: useForm Tests", () => {
  let INITIAL_STATE;

  beforeEach(() => {
    INITIAL_STATE = [
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
  });

  test("Should throw error when no inputs is passed on initialization", () => {
    expect(() => {
      useForm();
    }).toThrow();
  });

  test("Should have all the expected values returned with correct types", () => {
    const { result } = renderHook(() => useForm([]));

    expect(Object.keys(result.current).length).toBe(4);
    expect(typeof result.current.state).toBe("object");
    expect(typeof result.current.isValid).toBe("boolean");
    expect(typeof result.current.change).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  test("Should return the inital state after initialization", () => {
    const { result } = renderHook(() => useForm(INITIAL_STATE));
    expect(result.current.state).toBe(INITIAL_STATE);
  });

  test("Should return the updated state when new value is passed in via the change method", () => {
    const { result } = renderHook(() => useForm(INITIAL_STATE));
    act(() => {
      result.current.change({
        target: { name: "password", value: "123456" }
      });
    });

    const updatedState = [...INITIAL_STATE];
    updatedState[1].value = "123456";

    expect(result.current.state).toEqual(updatedState);
  });

  test("Should return the state with empty values when the reset method is called", () => {
    const { result } = renderHook(() => useForm(INITIAL_STATE));
    act(() => {
      result.current.reset();
    });

    const updatedState = [...INITIAL_STATE];
    updatedState[0].value = "";
    updatedState[1].value = "";

    expect(result.current.state).toEqual(updatedState);
  });

  test("Should return the valid state based on custom reducer passed", () => {
    function reducer(state, action) {
      const { state: inputs } = state;
      const { value } = action;
      return {
        ...state,
        state: [inputs[0], { ...inputs[1], value: value + "123" }]
      };
    }

    const { result } = renderHook(() => useForm(INITIAL_STATE, { reducer }));

    act(() => {
      result.current.change({
        target: {
          name: "password",
          value: "654321"
        }
      });
    });

    expect(result.current.state[1].value).toBe("654321123");
  });

  test("Should return the valid state based on custom validator passed", () => {
    function validator(inputs) {
      return true;
    }

    const { result } = renderHook(() => useForm(INITIAL_STATE, { validator }));

    act(() => {
      result.current.change({
        target: {
          name: "password",
          value: ""
        }
      });
    });

    expect(result.current.isValid).toBe(true);
  });
});
