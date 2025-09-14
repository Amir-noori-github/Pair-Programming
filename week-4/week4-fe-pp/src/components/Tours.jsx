import { useState } from "react";
import { tours } from "../data";
import Title from "./Title";
import Tour from "./Tour";

const Tours = () => {

  const [toursData, setToursData] = useState(tours);

  // handler to remove a tour by id
  const removeTour = (id) => {
    const filtered = toursData.filter((tour) => tour.id !== id);
    setToursData(filtered);
  };

  return (
    <section className="section" id="tours">
      <Title title="featured" subTitle="tours" />

      <div className="section-center featured-center">
        {toursData.map((tour) => {
          return (
            <div key={tour.id}>
              <Tour {...tour} />
              <button
                className="btn"
                onClick={() => removeTour(tour.id)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Tours;
