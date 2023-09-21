import { useEffect } from "react";

function Timer({ dispatch, seconds }) {
  const min = Math.floor(seconds / 60);
  const secs = seconds % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <p className="timer">
      {min}:{secs < 10 && "0"}
      {secs}
    </p>
  );
}

export default Timer;
