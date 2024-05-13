import './style.css';

import React, { useEffect, useState } from 'react';

const OrderWindow = ({ car, handleClose }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setIsOpen(true);
//     }, 100); // Add a small delay for the animation to be visible

//     return () => clearTimeout(timeout);
//   }, []);

  return (
    // <div className={`order-window ${isOpen ? 'open' : ''}`}>
      <div className="order-window">

      <h2>Order Details</h2>
      <div>
        <img src={car.image} alt={`${car.brand} ${car.model}`} />
        <p>Brand: {car.brand}</p>
        <p>Model: {car.model}</p>
        <p>Category: {car.category}</p>
        <p>Seats: {car.seats}</p>
        <p>Year: {car.year}</p>
        <p>Price per Hour: ${car.pricePerHour}</p>
        {/* Add more details as needed */}
      </div>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default OrderWindow;