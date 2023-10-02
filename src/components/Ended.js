import { useQuiz } from "../context/quizContext";

function Ended() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong>/ {totalPoints}
      </p>
      <p className="highscore">High Score : {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default Ended;
