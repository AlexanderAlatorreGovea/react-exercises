import React, { useState } from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

export default function Memory() {
  const tiles = shuffle([...TILE_COLORS, ...TILE_COLORS]);
  const selectedColors = new Array.fill(tiles.length);

  const submitColors = () => {};

  return (
    <>
      <h1>Memory</h1>
      <div className="board">
        {tiles.map((tile) => (
          <div
            onClick={() => submitColors(tile)}
            className={`tile ${tile}`}
          ></div>
        ))}
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
