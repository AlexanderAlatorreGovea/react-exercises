import React, { useEffect, useState } from "react";

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

export default function Quiz() {
  // Write your code here.
  const [questions, setQuestions] = useState([]);
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(QUIZ_API_BASE_URL);
      const json = await data.json();

      setQuestions(json);
    };

    getData();
  }, [currQuestionIdx]);

  const currentQuestion = questions[currQuestionIdx];

  const selectAnser = (index) => {
    setQuestions((current) =>
      current.map((obj) => {
        if (index === currQuestionIdx) {
          return { ...obj, selectedAnswer: index };
        }

        return obj;
      })
    );
  };

  return (
    <>
      <h1>Which of the following is a built-in Reacth hook?</h1>
      {questions.length &&
        currentQuestion.answers.map((item, index) => {
          return (
            <div
              className={`answer ${
                item.selectedAnswer === item.correctAnswer
                  ? "correct"
                  : "incorrect"
              }`}
              onClick={() => selectAnser(index)}
            >
              {item}
            </div>
          );
        })}

      <button disabled="true">Back</button>
      <button>Next</button>
    </>
  );
}
