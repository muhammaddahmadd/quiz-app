function Button({ dispatch, answer, numofqs, index }) {
  if (answer !== null)
    if (index < numofqs - 1)
      return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQs" })}
        >
          Next
        </button>
      );

  if (index >= 14)
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
