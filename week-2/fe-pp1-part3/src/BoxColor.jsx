// BoxColor.jsx

const BoxColor = ({ r, g, b }) => {
  const rgbColor = `rgb(${r}, ${g}, ${b})`; // <-- backticks for template literal
  const hexColor = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toLowerCase();

  // Auto-adjust text color for contrast
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  const textColor = brightness > 186 ? "#000" : "#fff";

  const boxStyle = {
    backgroundColor: rgbColor,
    color: textColor,
    padding: "20px",
    margin: "10px 0",
    border: "1px solid #000",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "sans-serif",
  };

  return (
    <div style={boxStyle}>
      <p>{rgbColor}</p>
      <p>{hexColor}</p>
    </div>
  );
};

export default BoxColor;
