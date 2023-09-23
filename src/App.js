import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";
import Ended from "./Ended";
import Footer from "./Footer";
import Timer from "./Timer";
import DarkModeToggle from "./DarkModeToggle";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};
const SecPerQ = 30;
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
        seconds: state.questions.length * SecPerQ,
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
      return { ...state, index: state.index++, answer: null }; // setting the answer back to null to reset it
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

function App() {
  const [
    { questions, status, index, answer, points, highscore, seconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionCount = questions.length;

  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataFetched", payload: data }))
      .catch((err) => dispatch({ type: "fetchfailed" }));
  }, []);

  return (
    <div className="app">
      {/* <DarkModeToggle /> */}
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numofqs={questionCount} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              totalPoints={totalPoints}
              numofqs={questionCount}
              index={index}
              answer={answer}
            />
            <Question
              ques={questions[index]}
              answer={answer}
              dispatch={dispatch}
              points={points}
            />
            <Footer>
              <Timer seconds={seconds} dispatch={dispatch} />
              <Button
                dispatch={dispatch}
                answer={answer}
                numofqs={questionCount}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "ended" && (
          <Ended
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
