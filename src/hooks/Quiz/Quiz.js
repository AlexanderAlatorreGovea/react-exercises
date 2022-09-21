import React, { useEffect } from "react";

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

export default function Quiz() {
  // Write your code here.
  const [data, setData] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const getData = await fetch(QUIZ_API_BASE_URL);
        const json = await getData.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      {/* Write your code here. */}
      <h1>Which of the following is a built-in Reacth hook?</h1>
      {data &&
        data[currentQuestionIdx].map((answers) => <h2>{answers.answer}</h2>)}
      <h2 className="answer">useState</h2>
      <h2 className="answer incorrect">useState</h2>
      <h2 className="answer">useState</h2>
      <h2 className="answer">useState</h2>

      <button disabled="true">Back</button>
      <button>Next</button>
    </>
  );
}
