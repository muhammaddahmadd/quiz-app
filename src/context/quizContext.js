import { createContext, useReducer, useEffect, useContext } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};
const Secs_Per_Qs = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, questions: action.payload, status: "ready" };
    case "fetchfailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * Secs_Per_Qs,
      };
    case "newAns":
      const question = state.questions.at(state.index); // finds the index of current question

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQs":
      return { ...state, index: state.index + 1, answer: null }; // setting the answer back to null to reset it
    case "ended":
      return {
        ...state,
        status: "ended",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
      };
    case "tick":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "ended" : state.status,
      };
    default:
      throw new Error("Error occured");
  }
}
const Url = "http://localhost:8000/questions";
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionCount = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  // const questionList = questions;
  useEffect(function () {
    fetch(`${Url}`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataFetched", payload: data }))
      .catch((err) => dispatch({ type: "fetchfailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        seconds,
        questionCount,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Error Occured!");
  return context;
}
export { QuizProvider, useQuiz };
