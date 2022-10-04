import React, { useState } from "react";

const useValue = ({ initialValue, type, id }) => {
  const [value, setValue] = useState(initialValue);

  return {
    id,
    setValue,
    value,
    type,
  };
};

export function TipCalculator2() {
  // Write your code here.
  const { setValue: setBill, ...bills } = useValue({
    initialValue: 50,
    type: "number",
    id: "bill",
  });

  const [tip, setTip] = useValue(18);
  const [numberOfPeople, setNumberOfPeople] = useValue(1);

  const totalTip = (bills.bill * tip) / 100;
  const amountToPayPerPerson = totalTip / numberOfPeople;

  return (
    <>
      {/* Write your code here. */}
      <div>
        <label htmlFor="bill">Bill</label>
        <input
          {...bills}
          min="0"
          onChange={(e) => setBill(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="tip">Tip</label>
        <input
          id="tip"
          type="number"
          min="0"
          value={tip}
          onChange={(e) => setTip(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="people">Number of People</label>
        <input
          id="people"
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
        />
      </div>
      <p>Total Tip: {isNaN(totalTip) ? "-" : `$${totalTip.toFixed(2)}`}</p>

      <p>
        Tip Per Person:{" "}
        {isNaN(amountToPayPerPerson)
          ? "-"
          : `$${amountToPayPerPerson.toFixed(2)}`}
      </p>
    </>
  );
}
