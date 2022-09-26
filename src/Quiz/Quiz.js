import { useState, useEffect } from "react";

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

export default function Quiz() {
  // Write your code here.
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetch(QUIZ_API_BASE_URL);
      const json = await data.json();

      setQuestions(json);
    };

    getData();
  }, []);

  if (!questions.length) return [];

  const currentQuestion = questions[currentQuestionIndex];

  const updateChosenAnswers = (questionIndex, answerIndex) => {
    const newChosenAnswers = [...chosenAnswers];
    newChosenAnswers[questionIndex] = answerIndex;
    setChosenAnswers(newChosenAnswers);
  };

  return (
    <>
      <h1>{currentQuestion.question}</h1>
      {questions.length &&
        currentQuestion.answers.map((answer, answerIndex) => {
          const chosenAnswer = chosenAnswers[currentQuestionIndex];
          let className = "answer";
          console.log(chosenAnswer);
          if (chosenAnswer === answerIndex) {
            className +=
              currentQuestion.correctAnswer === chosenAnswer
                ? " correct"
                : " incorrect";
          }
          console.log(className);
          return (
            <h2
              key={answer}
              className={className}
              onClick={() => {
                updateChosenAnswers(currentQuestionIndex, answerIndex);
              }}
            >
              {answer}
            </h2>
          );
        })}

      <button
        onClick={() => setCurrentQuestionIndex((prevState) => prevState - 1)}
        disabled={currentQuestionIndex === 0}
      >
        Back
      </button>
      <button
        onClick={() => setCurrentQuestionIndex((prevState) => prevState + 1)}
        disabled={currentQuestionIndex === questions.length - 1}
      >
        Next
      </button>
    </>
  );
}
