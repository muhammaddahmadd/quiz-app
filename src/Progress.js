function Progress({ points, totalPoints, index, numofqs, answer }) {
  return (
    <header className="progress">
      <progress max={numofqs} value={index++} />

      <p>
        Question: <strong>{index++}</strong>/{numofqs}
      </p>

      <p>
        Point: <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
