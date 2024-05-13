import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faArrowLeft, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import cars from '../data/carsData';
import { calculateDistance } from '../utils/distanceCalculator';
import '../styles/listCars.css';


const ListCars = ({ distance }) => {
  const [isListCarsOpen, setIsListCarsOpen] = useState(false);
  const openListCars = () => setIsListCarsOpen(true);
  const closeListCars = () => setIsListCarsOpen(false);

  return (
    <>
      <div className={`cars-list ${isListCarsOpen ? 'open' : ''}`}>
        {/* <div className='faListUl faArrowLeft' onClick={closeListCars}>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </div> */}
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
      {/* <div className='list-cars-bt'>
        <div className='faListUl' onClick={openListCars}>
          <FontAwesomeIcon icon={faListUl}/>
        </div>
      </div> */}

      {isListCarsOpen && <div className="overlay" onClick={closeListCars}></div>}
    </>
  );
};

export default ListCars;


