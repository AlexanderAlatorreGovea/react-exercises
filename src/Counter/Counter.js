import React, { useEffect, useReducer } from "react";

const initialState = {
  lapse: 0,
  started: null,
  now: null,
};

function reducer(state, { now, type }) {
  const { lapse, started } = state;

  switch (type) {
    case "start":
      return { ...state, now, started: now };
    case "tick":
      return { ...state, now };
    case "stop":
      return { ...state, started: null, lapse: lapse + (now - started) };
    case "clear":
      return { ...state, started: null, lapse: 0, now: null };
    default:
      throw new Error();
  }
}

export function Stopwatch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { started, lapse, now } = state;

  const current = started ? now - started : 0;
  const total = lapse + current;

  useEffect(() => {
    if (started) {
      const tick = () => dispatch({ type: "tick", now: Date.now() });
      const intervalId = setInterval(tick, 0);
      return () => clearInterval(intervalId);
    }
  }, [started]);

  return (
    <div>
      <label
        style={{
          fontSize: "5em",
          display: "block",
        }}
      >
        {total}ms
      </label>
      <button
        style={{
          border: "1px solid #ccc",
          background: "#fff",
          fontSize: "2em",
          padding: 15,
          margin: 5,
          width: 200,
        }}
        onClick={() => {
          dispatch({
            type: started ? "stop" : "start",
            now: Date.now(),
          });
        }}
      >
        {started ? "Stop" : "Start"}
      </button>
      <button
        style={{
          border: "1px solid #ccc",
          background: "#fff",
          fontSize: "2em",
          padding: 15,
          margin: 5,
          width: 200,
        }}
        onClick={() => dispatch({ type: "clear" })}
      >
        Clear
      </button>
    </div>
  );
}
