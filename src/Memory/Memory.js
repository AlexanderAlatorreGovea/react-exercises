import React, { useState, useEffect } from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

export default function Memory() {
  // to avoid for shuffle to be used on every
  // single render, we can pass it a call back function to
  //use state to shuffle the values
  const [board, setBoard] = useState(() =>
    shuffle([...TILE_COLORS, ...TILE_COLORS])
  );
  // to set indexes of arrays selected
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  useEffect(() => {
    if (selectedTiles.length < 2) return;
    if (board[selectedTiles[0]] === board[selectedTiles[1]]) {
      setMatchedTiles([...matchedTiles, ...selectedTiles]);
      setSelectedTiles([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedTiles([]), 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedTiles.length]);

  const selectTile = (index) => {
    if (selectedTiles.length >= 2 || selectedTiles.includes(index)) return;

    setSelectedTiles([...selectedTiles, index]);
  };

  const didPlayerWin = matchedTiles.length === board.length;

  const resetGame = () => {
    setBoard(shuffle([...TILE_COLORS, ...TILE_COLORS]));
    setSelectedTiles([]);
    setMatchedTiles([]);
  };

  return (
    <>
      <h1>{didPlayerWin ? "You Win!" : "Memory"}</h1>
      <div className="board">
        {board.map((tileColor, i) => {
          const isTurnedOver =
            selectedTiles.includes(i) || matchedTiles.includes(i);

          const className = isTurnedOver ? `tile ${tileColor}` : "tile";

          return (
            <div
              key={i}
              onClick={() => selectTile(i)}
              className={className}
            ></div>
          );
        })}
        {didPlayerWin && <button onClick={() => resetGame}>Restart</button>}
      </div>
    </>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
