import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import Progress from "./Progress";

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return { ...state, questions: action.payload, status: "ready" };
    case "fetchfailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
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

    default:
      throw new Error("Error occured");
  }
}

function App() {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };

  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const questionCount = questions.length;

  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json(null))
      .then((data) => dispatch({ type: "dataFetched", payload: data }))
      .catch((err) => dispatch({ type: "fetchfailed" }));
  }, []);

  return (
    <div className="app">
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
            <Button dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
