function Progress({ points, totalPoints, index, numofqs, answer }) {
  return (
    <header className="progress">
      <progress max={numofqs} value={index + Number(answer !== null)} />
      {/* //Number(answer !== null) */}
      <p>
        Question: <strong>{index + Number(answer !== null)}</strong>/{numofqs}
      </p>

      <p>
        Point: <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
