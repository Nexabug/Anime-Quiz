import React from "react";

function Options({ handleOpt, isSelected, o, i }) {
  const optionClass = isSelected
    ? o === i.correctOption
      ? "selected correct"
      : "selected"
    : "";
  return (
    <button
      className={`option ${optionClass}`}
      key={o}
      onClick={() => handleOpt(i, o)}
      disabled={isSelected}
    >
      {o}
    </button>
  );
}

export default Options;
