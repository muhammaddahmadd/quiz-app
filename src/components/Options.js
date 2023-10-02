import { useQuiz } from "../context/quizContext";
function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const hasAnswered = answer !== null; // to make sure the user has answered
  // console.log(questions.options);
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAns", payload: index })} // index to keep track of the current option which is being clicked
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
