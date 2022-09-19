import React, { useState } from "react";

export default function TipCalculator() {
  // Write your code here.
  const [bill, setBill] = useState("50");
  const [tip, setTip] = useState("18");
  const [numberOfPeople, setNumberOfPeople] = useState("1");

  const tipPercentage = parseInt(tip) / 100;
  const totalTip = (parseInt(bill) * tipPercentage).toFixed(2) || "-";
  const amountToPayPerPerson = totalTip / numberOfPeople;

  return (
    <>
      {/* Write your code here. */}
      <div>
        <label for="bill">Bill</label>
        <input
          id="bill"
          type="text"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </div>
      <div>
        <label for="tip">Tip</label>
        <input
          id="tip"
          type="text"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
        />
      </div>
      <div>
        <label for="people">Number of People</label>
        <input
          id="people"
          type="text"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        />
      </div>
      <div>
        <span>Total Tip:</span> <span>{totalTip}</span>
      </div>
      <div>
        <span>Total Tip:</span>
        <span>${amountToPayPerPerson.toFixed(2)}</span>
      </div>
    </>
  );
}
