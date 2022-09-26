import React from "react";
import { useState } from "react";

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
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        <div style={{ width: "100%" }}>
          {board.map((tile, index) => (
            <div className="square" onClick={() => squareClick(index)}>
              {tile}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
