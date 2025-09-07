// Random.jsx
const Random = ({ min, max }) => {
  const value = Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <div className="random-box">
      <span className="label">Random value between {min} and {max}:</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default Random;
