import { useQuiz } from "../context/quizContext";

function Button() {
  const { dispatch, answer, numofqs, index } = useQuiz();
  // console.log(answer);
  if (answer === null) return null;
  if (index < numofqs - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQs" })}
      >
        Next
      </button>
    );

  if (index === numofqs - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "ended" })}
      >
        End
      </button>
    );
}

export default Button;
