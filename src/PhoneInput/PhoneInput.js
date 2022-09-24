import React, { useState } from "react";

const PLACEHOLDER_PHONE_NUMBER = "(555) 55-5555";
const MAXIMUM_ALLOWED_INPUT_CHARACTERS = 10;

export default function PhoneInput() {
  // Write your code here.
  const [value, setValue] = useState("");

  const hasExceededTheMaximumAmountOfCharsAllowed =
    value.length === MAXIMUM_ALLOWED_INPUT_CHARACTERS;

  const onChange = (e) => {
    setValue(formatInputValue(e.target.value));
  };

  return (
    <>
      <form>
        <input
          type="tel"
          value={formatInputValue(value)}
          onChange={onChange}
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

function formatInputValue(str) {
  const rawString = str.replace(/\D/g, "");
  let output = "";

  if (rawString.length > 0) {
    output += "(";
    output += rawString.substring(0, 3);
  }

  if (rawString.length > 3) {
    output += ") ";
    output += rawString.substring(3, 6);
  }

  if (rawString.length > 6) {
    output += "-";
    output += rawString.substring(6, 10);
  }

  return output;
}
