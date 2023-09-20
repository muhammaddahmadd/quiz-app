import Options from "./Options";
function Question({ ques, answer, dispatch }) {
  console.log(ques);
  return (
    <div className="options">
      <h2>{ques.question}</h2>
      <Options ques={ques} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
