import React, { useState } from "react";

const PLACEHOLDER_PHONE_NUMBER = "(555) 55-5555";
const MAXIMUM_ALLOWED_INPUT_CHARACTERS = 10;

export default function PhoneInput() {
  // Write your code here.
  const [value, setValue] = useState("");

  const hasExceededTheMaximumAmountOfCharsAllowed =
    value.length === MAXIMUM_ALLOWED_INPUT_CHARACTERS;

  const formatInputValue = (value) => {
    return value;
  };

  return (
    <>
      <form>
        <input
          type="text"
          value={formatInputValue(value)}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={PLACEHOLDER_PHONE_NUMBER}
        />
        <button
          disabled={!value.length || hasExceededTheMaximumAmountOfCharsAllowed}
        >
          Submit
        </button>
      </form>
    </>
  );
}
