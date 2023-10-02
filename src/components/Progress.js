import { useQuiz } from "../context/quizContext";

function Progress() {
  const { points, totalPoints, index, numofqs, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={numofqs} value={index + Number(answer !== null)} />
      <p>
        Question: <strong>{index + 1}</strong>/{numofqs}
      </p>

      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
