import React, { useState, useEffect } from "react";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  // Write your code here.
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const getData = async (url, setData) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const json = await response.json();
      setData(json);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData(QUESTIONS_API_BASE_URL, setQuestions);
    getData(SUBMISSIONS_API_BASE_URL, setSubmissions);
  }, []);

  //console.log("questions", questions)
  //console.log("submissions", submissions)

  const uniqueCategories = [];
  const categories = () =>
    questions.forEach((q) => {
      if (!uniqueCategories.includes(q.category)) {
        uniqueCategories.push(q.category);
      }
    });

  console.log(categories());

  return (
    <>
      {questions.map((question) => (
        <div className="category">
          <h2>CSS 1 / 5</h2>
          <div className="question">
            <div className="status correct"></div>
            <h3>Rainbow Circles</h3>
          </div>
          <div className="question">
            <div className=" status partially-correct">
              <h3>NavBar</h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
