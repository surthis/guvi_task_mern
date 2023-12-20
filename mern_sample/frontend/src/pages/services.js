import React from 'react';

function Services() {
  const services = [
    { id: 1, name: 'General service check-up' },
    { id: 2, name: 'Oil change' },
    { id: 3, name: 'Water wash' },
    // Add more services as needed
  ];

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>{service.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
