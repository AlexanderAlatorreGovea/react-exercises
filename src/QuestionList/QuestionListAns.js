import React, { useEffect, useState } from "react";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

const Question = ({ question, submissionsByQuestion }) => {
  const submissionStatus = submissionsByQuestion[question.id];
  const statusClass =
    submissionStatus == null
      ? "unattempted"
      : submissionStatus.toLowerCase().replace("_", "-");

  return (
    <div className="question">
      <div className={`status ${statusClass}`}></div>
      <h3>{question.name}</h3>
    </div>
  );
};

const Category = ({ category, questions, submissionsByQuestion }) => {
  const totalQuestions = questions.length;
  const numQuestionsCorrect = questions.reduce((sum, question) => {
    return submissionsByQuestion[question.id] === "CORRECT" ? sum + 1 : sum;
  }, 0);

  return (
    <div className="category">
      <h2>
        {category} - {numQuestionsCorrect} / {totalQuestions}
      </h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </div>
  );
};

const QuestionList = () => {
  const [questions, submissions] = useQuestionsAndSubmissions();
  const questionsByCategory = getQuestionsByCategory(questions);
  const submissionsByQuestion = getSubmissionsByQuestion(submissions);

  const categories = Object.keys(questionsByCategory);

  return (
    <div>
      {categories.map((category) => (
        <Category
          key={category}
          category={category}
          questions={questionsByCategory[category]}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </div>
  );
};

function useQuestionsAndSubmissions() {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // we are not doing two await fetch because they do not depend on each
      // other to run, we will be use Promise.all
      const [questionResponse, submissionsResponse] = await Promise.all([
        fetch(QUESTIONS_API_BASE_URL),
        fetch(SUBMISSIONS_API_BASE_URL),
      ]);

      const [questions, submissions] = await Promise.all([
        questionResponse.json(),
        submissionsResponse.json(),
      ]);

      setQuestions(questions);
      setSubmissions(submissions);
    };

    fetchData();
  }, []);

  return [questions, submissions];
}

function getQuestionsByCategory(questions) {
  const questionsByCategory = {};

  questions.forEach(({ category, ...question }) => {
    if (!questionsByCategory[category]) {
      questionsByCategory[category] = [];
    }

    questionsByCategory[category].push(question);
  });

  return questionsByCategory;
}

function getSubmissionsByQuestion(submissions) {
  const submissionsByQuestion = {};

  submissions.forEach(({ questionId, status }) => {
    submissionsByQuestion[questionId] = status;
  });

  return submissionsByQuestion;
}

export default QuestionList;
