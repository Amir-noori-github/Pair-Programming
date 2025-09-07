import React from 'react';

const Tour = ({ image, date, title, info, location, duration, cost }) => {
  return (
    <article className="tour-card">
      <div className="tour-img-container">
        <img src={image} className="tour-img" alt={title} />
        <p className="tour-date">{date}</p>
      </div>
      <div className="tour-info">
        <div className="tour-title">
          <h4>{title}</h4>
        </div>
        <p>{info}</p>
        <div className="tour-details">
          <p className="tour-location">
            <i className="fas fa-map" /> {location}
          </p>
          <p className="tour-duration">{duration} days</p>
          <p className="tour-price">${cost}</p>
        </div>
      </div>
    </article>
  );
};

export default Tour;