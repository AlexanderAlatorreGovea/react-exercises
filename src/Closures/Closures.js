import React from "react";
import { useState, useEffect, useRef } from "react";

export const Closures = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  countRef.current = count;

  useEffect(() => {
    setTimeout(() => {
      alert("you clicked on: " + countRef.current);
    }, 3000);
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>show Alert</button>
      {/* <button onClick={handleAlertClick}>click me</button> */}
    </div>
  );
};
