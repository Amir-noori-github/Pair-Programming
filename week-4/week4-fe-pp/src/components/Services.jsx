// import { useState } from "react";
// import { services } from "../data";
// import Title from "./Title";
// import Service from "./Service";

// const Services = () => {
//   // put services array into state
//   const [servicesData, setServicesData] = useState(services);

//   return (
//     <section className="section services" id="services">
//       <Title title="our" subtitle="services" />

//       <div className="section-center services-center">
//         {servicesData.map((service) => {
//           return <Service {...service} key={service.id} />;
//         })}
//       </div>
//     </section>
//   );
// };
// export default Services;



import { useState } from "react";
import { services } from "../data";
import Title from "./Title";
import Service from "./Service";

const Services = () => {

  const [servicesData, setServicesData] = useState(services);

  // handler to remove a service by id
  const removeService = (id) => {
    const filtered = servicesData.filter((service) => service.id !== id);
    setServicesData(filtered);
  };

  return (
    <section className="section services" id="services">
      <Title title="our" subTitle="services" />

      <div className="section-center services-center">
        {servicesData.map((service) => {
          return (
            <div key={service.id}>
              <Service {...service} />
              <button
                className="btn"
                onClick={() => removeService(service.id)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
