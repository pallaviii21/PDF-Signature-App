import React from "react";

const DraggableSignature = ({ signature }) => {
  return (
    <div
      draggable
      className="cursor-move inline-block border px-2 py-1 bg-yellow-100 rounded shadow"
      style={{
        fontFamily: signature.fontFamily,
        fontSize: `${signature.fontSize}px`,
        userSelect: "none",
      }}
    >
      {signature.text}
    </div>
  );
};

export default DraggableSignature;
