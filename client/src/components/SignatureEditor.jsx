import { useState, useEffect } from "react";

const availableFonts = [
  "GreatVibes",
  "Pacifico",
  "Sacramento",
  "Satisfy",
  "Helvetica",
  "Courier",
  "TimesRoman",
];

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Red", value: "#FF0000" },
  { name: "Green", value: "#008000" },
];

const SignatureEditor = ({ onSignatureChange }) => {
  const [text, setText] = useState("Your Sign Here");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Satisfy");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    onSignatureChange({ text, fontSize, fontFamily, color });
  }, [text, fontSize, fontFamily, color]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Signature Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded px-2 py-1 mt-1 bg-white"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="w-full border rounded px-2 py-1 mt-1 bg-white"
        >
          {availableFonts.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Font Color</label>
        <select
          className="border p-2 rounded w-full mt-1 bg-white"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {colors.map((c) => (
            <option key={c.value} value={c.value}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Font Size</label>
        <input
          type="range"
          min="12"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm mt-1">{fontSize}px</div>
      </div>

      <div className="mt-4 p-2 border rounded shadow-sm bg-white text-center">
        <div
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            color,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default SignatureEditor;
