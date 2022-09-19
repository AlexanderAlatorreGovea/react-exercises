import React, { useState } from 'react';

export default function TipCalculator() {
  // Write your code here.
  const [bill, setBill] = useState(50);
  const [tip, setTip] = useState(18);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const totalTip = (bill * tip) / 100;
  const amountToPayPerPerson = totalTip / numberOfPeople;

  
  return (
    <>
      {/* Write your code here. */}
        <div>
        <label htmlFor="bill">Bill</label>
        <input
          id="bill"
          type="number"
          value={bill}
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
     <p>
     Total Tip: {isNaN(totalTip) ? "-" : `$${totalTip.toFixed(2)}`}
     </p>
    
    <p>
      Tip Per Person: {isNaN(amountToPayPerPerson) ? "-" : `$${amountToPayPerPerson.toFixed(2)}`}
     </p>
    </>
  );
}