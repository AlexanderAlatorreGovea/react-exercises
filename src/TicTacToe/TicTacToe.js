import React from "react";
import { useState, useEffect } from "react";
import { _getData } from "./data";

import "./TicTacToe.css";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const PLAYER_ONE = "X";
const PLAYER_TWO = "O";
const PLAYER_ONE_TURN = "Is player's one turn";
const PLAYER_TWO_TURN = "Is player's two turn";

const AMOUNT_OF_TILES = 9;
const TILES = Array(AMOUNT_OF_TILES).fill("");

const TicTacToe = () => {
  const [board, setBoard] = useState(TILES);
  const [playersTurn, setPlayersTurn] = useState(PLAYER_ONE);

  const squareClick = (index) => {
    const boardShallowCopy = [...board];
    const currentPlayer = playersTurn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    const isPlayerDoubleClickingTile = board[index];

    if (isPlayerDoubleClickingTile) return;

    boardShallowCopy[index] = currentPlayer;

    setBoard(boardShallowCopy);
    setPlayersTurn(currentPlayer);
    checkWinner(winningCombinations, currentPlayer, boardShallowCopy);
  };

  let player = playersTurn === PLAYER_ONE ? PLAYER_ONE_TURN : PLAYER_TWO_TURN;

//   const [data, setData] = useState(null);
//   useEffect(() => {
//     const getData = async () => { 
//       const response = await _getData()
     
//       setData(response)
//     };

//     getData()
//   }, []);

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((tile, index) => (
          <div className="square" onClick={() => squareClick(index)}>
            <div
              style={{
                width: "20px",
                margin: "0 auto",
              }}
            >
              {tile}
            </div>
          </div>
        ))}

        <div style={{ width: "100%" }}>
          <p style={{ textAlign: "center" }}>{player}</p>
        </div>
      </div>
    </>
  );
};

function checkWinner(winningCombinations, currentPlayer, boardShallowCopy) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [columnOne, columnTwo, columnThree] = winningCombinations[i];

    if (
      boardShallowCopy[columnOne] &&
      boardShallowCopy[columnOne] === boardShallowCopy[columnTwo] &&
      boardShallowCopy[columnOne] === boardShallowCopy[columnThree]
    ) {
      setTimeout(() => {
        alert(
          `The winner is ${
            currentPlayer === PLAYER_ONE ? "Player One" : "Player Two"
          }`
        );
      }, 0);
    }
  }
}

export default TicTacToe;
