// IdCard.jsx
const IdCard = ({ picture, firstName, lastName, gender, birth, height }) => (
  <div className="id-card">
    <img src={picture} alt={`${firstName} ${lastName}`} />
    <ul className="no-bullets">
      <li><strong>First Name:</strong> {firstName}</li>
      <li><strong>Last Name:</strong> {lastName}</li>
      <li><strong>Gender:</strong> {gender}</li>
      <li><strong>Height:</strong> {(height / 100).toFixed(2)}m</li>
      <li><strong>Birth:</strong> {new Date(birth).toDateString()}</li>
    </ul>
  </div>
);

export default IdCard;
