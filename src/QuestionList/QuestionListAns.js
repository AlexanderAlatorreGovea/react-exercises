import React, { useEffect, useState } from "react";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

const QuestionList = () => {
  const [questions, submissions] = useQuestionsAndSubmissions();
  const questionsByCategory = getQuestionsByCategory(questions);
  const submissionsByQuestion = getSubmissionsByQuestion(submissions);

  const categories = Object.keys(questionsByCategory)

  return <div></div>;
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
