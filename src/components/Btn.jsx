import React from "react";

function Btn({ handle, cond, children }) {
  return (
    <button className="btn" onClick={handle} disabled={cond}>
      {children}
    </button>
  );
}

export default Btn;
