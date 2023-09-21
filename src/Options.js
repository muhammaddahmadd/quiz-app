function Options({ ques, answer, dispatch }) {
  const hasAnswered = answer !== null; // to make sure the user has answered

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
          onClick={() => dispatch({ type: "newAns", payload: index })} // index to keep track of the current option which is being clicked
        >
          {options}
        </button>
      ))}
    </div>
  );
}

export default Options;
