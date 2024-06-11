import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faArrowLeft, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import cars from '../data/carsData';
import '../styles/listCars.css';


const ListCars = ({ distance }) => {
  return (
    <>
      <div className="cars-list">
        <h2>Vehicles nearby</h2>
        {cars.map((car) => (
          <div key={car.id} className="car-item">
            <img src={car.image} alt={`${car.brand} ${car.model}`} />
            <div className="car-details">
              <h3>{`${car.brand} ${car.model}`}</h3>
              <p>
                <span>{car.year}</span> • <span>{car.seats} seats</span>
              </p>
              <p>
                <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
              </p>
            </div>
            <div className='faLocationArrow'>
                {distance}
                <FontAwesomeIcon icon={faLocationArrow}/>
            </div>
          </div>
        ))}

      </div> 
    </>
  );
};

export default ListCars;


