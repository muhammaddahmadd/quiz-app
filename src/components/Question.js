import { useQuiz } from "../context/quizContext";
import Options from "./Options";
function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div className="options">
      <h4>{questions.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
