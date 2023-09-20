function Options({ ques, answer, dispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {ques.options.map((options, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === ques.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={options}
          onClick={() => dispatch({ type: "newAns", payload: index })}
        >
          {options}
        </button>
      ))}
    </div>
  );
}

export default Options;
