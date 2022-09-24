import React, { useState, useEffect } from "react";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
const NUM_GUESSES = 6;
const WORD_LENGTH = 5;

export default function Wordle() {
  // Write your code here.
  const [guesses, setGuesses] = useState(Array(NUM_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const fetchSolution = async () => {
      const response = await fetch(WORD_LIST_API_URL);
      const words = await response.json();
      const randomIndex = Math.floor(Math.random() * words.length);

      setSolution(words[randomIndex]);
    };

    fetchSolution();
  }, []);

  useEffect(() => {
    if (solution === null) return;

    const onPressKey = (event) => {
      if (guesses[NUM_GUESSES - 1] !== null || guesses.includes(solution)) {
        return;
      }

      const charCode = event.key.toLowerCase().charCodeAt(0);
      const isLetter =
        event.key.length === 1 &&
        charCode >= "a".charAt(0) &&
        charCode <= "z".charCodeAt(0);

      setCurrentGuess((previousGuess) => {
        if (event.key === "Backspace") {
          return previousGuess.slice(0, -1);
        } else if (
          event.key === "Enter" &&
          previousGuess.length === WORD_LENGTH
        ) {
          // findIndex will stop at the first value that meets the condition of 
          // the guess being null
          const currentGuessIdx = guesses.findIndex((guess) => guess === null);
          const guessesClone = [...guesses];
          guesses[currentGuessIdx] = previousGuess;
          setGuesses(guessesClone);
          return "";
        } else if ((previousGuess.length < WORD_LENGTH) & isLetter) {
          return previousGuess + event.key.toLowerCase();
        }

        return previousGuess;
      });
    };

    window.addEventListener("keydown", onPressKey);

    return () => window.removeEventListener("keydown", onPressKey);
  }, [solution, guesses]);

  return (
    <div className="board">
      {guesses.map((guess, index) => {
        const currentGuessIndex = guesses.findIndex((guess) => guess === null);

        if (solution === null) return null;

        return (
          <GuessLine
            key={index}
            guess={(index === currentGuessIndex
              ? currentGuess
              : guess ?? ""
            ).padEnd(WORD_LENGTH)}
            solution={solution}
            isFinal={currentGuessIndex > index || currentGuessIndex === -1}
          />
        );
      })}
    </div>
  );
}

function GuessLine({ guess, solution, isFinal }) {
  return (
    <div className="line">
      {guess.split("").map((char, index) => {
        let className = "tile";

        if (isFinal) {
          if (char === solution[index]) {
            className += " correct";
          } else if (solution.includes(char)) {
            className += " close";
          } else {
            className += " incorrect";
          }
        }

        return (
          <div key={index} className={className}>
            {char}
          </div>
        );
      })}
    </div>
  );
}
