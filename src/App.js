import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Button from "./components/Button";
import Progress from "./components/Progress";
import Ended from "./components/Ended";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { useQuiz } from "./context/quizContext";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <Button />
            </Footer>
          </>
        )}
        {status === "ended" && <Ended />}
      </Main>
    </div>
  );
}

export default App;
