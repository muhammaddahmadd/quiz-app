import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  // return state + action;
  // if (action.type === "min") return state - 1;
  // if (action.type === "max") return state + 1;
  // if (action.type === "setCount") return action.payload;
  switch (action.type) {
    case "min":
      return { ...state, count: state.count - state.step };
    case "max":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      // return { ...state, count: 0, step: 1 };
      return initialState;
    default:
      throw new Error("Unkown Action");
  }
}

function DateCounter() {
  // const [step, setStep] = useState(1);
  // // const [count, setCount] = useState(0);
  // const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("Sep 20 2023");
  date.setDate(date.getDate() + count);

  const min = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    // dispatch({ type: "min", payload: -1 });
    dispatch({ type: "min" });
  };

  const max = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    // dispatch({ type: "max", payload: 1 });
    dispatch({ type: "max" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={min}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={max}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
