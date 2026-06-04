import React from "react";

function Ques({ i }) {
  return (
    <h3 className="question-title">
      <span>Q{i.id}</span> {i.question}
    </h3>
  );
}

export default Ques;
