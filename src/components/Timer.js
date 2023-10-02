import { useEffect } from "react";
import { useQuiz } from "../context/quizContext";

function Timer() {
  const { dispatch, seconds } = useQuiz();
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
    <p className="timer timer-blink">
      {min}:{secs < 10 && "0"}
      {secs}
    </p>
  );
}

export default Timer;
