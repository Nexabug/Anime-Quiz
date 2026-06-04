import React, { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import Logo from "./components/Logo";
import "./App.scss";
import Progress from "./components/Progress";
import Main from "./components/Main.jsx";
import Questions from "./components/Questions.jsx";
import OptList from "./components/OptList.jsx";
import Options from "./components/Options.jsx";
import Ques from "./components/Ques.jsx";
import Btn from "./components/Btn.jsx";
import Submit from "./components/Submit.jsx";
import useFetch from "./hooks/useFetch.js";
import Footer from "./components/Footer.jsx";

const initialState = {
  cur: 1,
  marks: 0,
  isSelected: false,
  IsSubmit: false,
  isStart: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "next":
      return {
        ...state,
        cur: state.cur + 1,
        isSelected: false,
      };
    case "prev":
      return {
        ...state,
        cur: state.cur - 1,
        isSelected: false,
      };
    case "submit":
      return {
        ...state,
        IsSubmit: true,
      };
    case "start":
      return {
        ...state,
        isStart: true,
      };
    case "selectOpt":
      return {
        ...state,
        isSelected: true,
      };

    case "addmarks":
      return {
        ...state,
        marks: state.marks + action.payload,
      };
  }
}

function App() {
  const timeLimit = 300;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { d } = useFetch();
  const { marks, cur, isSelected, IsSubmit, isStart } = state;
  const [timer, setTimer] = useState(timeLimit);
  const i = d.at(cur - 1);

  const TotalMarks = d.reduce((acc, i) => acc + i.marks, 0);
  const presenatge = TotalMarks ? (marks / TotalMarks) * 100 : 0;
  const NextCond = cur === d.length;
  const PrevCond = cur === 1;

  const sec = String(timer % 60).padStart(2, "0");
  const min = Math.trunc(timer / 60);

  useEffect(() => {
    if (!isStart) return;
    if (timer <= 0) {
      setTimer(0);
      return;
    }

    const id = setInterval(() => {
      setTimer((i) => i - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isStart, timer]);

  function handleOpt(i, o) {
    dispatch({ type: "selectOpt" });
    if (i.correctOption === o) {
      dispatch({ type: "addmarks", payload: i.marks });
    }
  }
  function handlePrev() {
    dispatch({ type: "prev" });
  }
  function handleNext() {
    dispatch({ type: "next" });
  }
  function handleSubmit() {
    dispatch({ type: "submit" });
  }
  function handleReset() {
    dispatch({ type: "reset" });
  }

  function handleStart() {
    dispatch({ type: "start" });
    setTimer(timeLimit);
  }

  let content;

  if (!isStart) {
    content = <Btn handle={handleStart}>start</Btn>;
  } else if (timer === 0) {
    content = (
      <>
        <div className="result-card">oopss!!!</div>
        <Btn handle={handleReset}>re-test</Btn>
      </>
    );
  } else if (IsSubmit) {
    content = (
      <>
        <Submit />
        <Btn handle={handleReset}>re-test</Btn>
      </>
    );
  } else {
    content = (
      <>
        <p className="timer">
          {min}:{sec}
        </p>
        {i && (
          <Questions>
            <Ques i={i} />
            <OptList>
              {i.options.map((o) => (
                <Options
                  key={o}
                  handleOpt={handleOpt}
                  isSelected={isSelected}
                  o={o}
                  i={i}
                />
              ))}
            </OptList>
            <div className="btns">
              <Btn handle={handlePrev} cond={PrevCond}>
                Prev
              </Btn>

              {NextCond ? (
                <Btn handle={handleSubmit}> submit </Btn>
              ) : (
                <Btn handle={handleNext} cond={NextCond}>
                  Next
                </Btn>
              )}
            </div>
          </Questions>
        )}
      </>
    );
  }

  return (
    <div className="body">
      <Header>
        <Logo />
        <h1>ANIME QUIZ</h1>
      </Header>
      <Progress className="progress">
        <progress className="pro" max={TotalMarks} value={marks}></progress>
        <div>
          <span>Marks: {marks}</span>
          <span>Total Marks : {TotalMarks}</span>
          <span>Percentage: {presenatge.toFixed(2)}%</span>
        </div>
      </Progress>
      <Main className="main">{content}</Main>
      <Footer />
    </div>
  );
}

export default App;
