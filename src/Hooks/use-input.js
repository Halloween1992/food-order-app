import { useReducer } from "react";

const useInput = (inputConfig, inputValue) => {
  const initInput = {
    value: "",
    isTouched: false,
  };

  const inputReducer = (state, action) => {
    if (action.type === inputConfig.type.change)
      return { ...state, value: action.value };
    if (action.type === inputConfig.type.blur)
      return { ...state, isTouched: action.touched };

    return initInput;
  };

  const [input, dispatch] = useReducer(inputReducer, initInput);

  const inputChangeHandler = (e) => {
    dispatch({
      type: inputConfig.type.change,
      value: e.target.value,
    });
  };

  const inputBlurHandler = () => {
    dispatch({
      type: inputConfig.type.blur,
      touched: true,
    });
  };

  const isInputValid = inputValue(input.value);

  return {
    value: input.value,
    onchage: inputChangeHandler,
    onBlur: inputBlurHandler,
    isInputValid,
    isTouched: input.isTouched,
  };
};

export default useInput;
