import React, { useState, useRef, useEffect } from 'react';
import ImageCarousel from '../assets/ImageCarousel';
import '../styles/infoWindow.css';
import Invitation from './Invitation';
import OrderView from './OrderView';
import Swal from 'sweetalert2';
import { calculateDistance } from '../utils/distanceCalculator';

//icons
import { BiSolidBatteryLow } from "react-icons/bi";
import { BsFuelPumpFill } from "react-icons/bs";
import { RiPinDistanceLine } from "react-icons/ri";
import { PiSeatFill } from "react-icons/pi";
import { MdLocationOff } from "react-icons/md";

//animations
import { useSpring, animated } from '@react-spring/web'; //animation for slow open the more details


const CarInfoWindow = ({ selectedCar, onCloseClick, userLocation }) => {

  const distance = calculateDistance(userLocation, selectedCar.coordinates);

  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null); 

  const [showInvitation, setShowInvitation] = useState(false);
  const handleOrderClick = () => {
    setShowInvitation(true);
    setShowMore(false); // הסתרת ה-"showMore" אם ה-Invitation מוצג
  };


  const [reservationData, setReservationData] = useState(null);

  const handleCheckAvailability = (data) => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const isAvailable = !storedReservations.some(reservation =>
      reservation.carId === selectedCar.id &&
      ((new Date(`${reservation.startDate}T${reservation.startTime}`) < new Date(`${reservation.endDate}T${reservation.endTime}`)) &&
       (new Date(`${data.startDate}T${data.startTime}`) < new Date(`${data.endDate}T${data.endTime}`)))
    );
  
    if (isAvailable) {
      setReservationData(data);
    } else {
      Swal.fire('לא זמין', 'הרכב אינו זמין לתאריכים ולשעות שנבחרו', 'error');
    }
  };
  

  const handleConfirmOrder = () => {
    setReservationData(null);
    onCloseClick();
  };

  const carouselAnimation = useSpring({
    opacity: showMore ? 1 : 0,
    transform: showMore ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 300 },
  });
  

  // הוסף useEffect לזיהוי לחיצה מחוץ לחלון
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onCloseClick(); 
      }
    };

    document.body.addEventListener('mousedown', handleClickOutside); 
    document.body.addEventListener('touchstart', handleClickOutside); 

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside); 
      document.body.removeEventListener('touchstart', handleClickOutside); 
    };
  }, [onCloseClick]); // הוסף useEffect עם התלות ב-onCloseClick

  return (
    <div ref={ref} className="vehicle-info"> {/* הוסף את ref ל-div הראשי */}
      <div className="vehicle-info-header">
        <div className="vehicle-info-header-text">
          <h1 class="sticky">{selectedCar.brand}</h1>
          <h1>{selectedCar.model}</h1>
        </div>
        
        
        <img
          src={selectedCar.image}
          alt={`${selectedCar.brand} ${selectedCar.model}`}
          className="vehicle-info-image"
        />
      </div>
      <div className="vehicle-info-details">
          { (distance) ? ( //ask if ther is a distance set
            <div>
              <RiPinDistanceLine />
              <span>{distance}</span>
            </div>
          ) : ( 
            <div>
              <MdLocationOff />
            </div>
          )}

          {selectedCar.fuel !== 'NaN' && ( // הסתרה אם הערך fuel הוא 'NaN'
            <div>
              <BsFuelPumpFill />
              <span>{selectedCar.fuel}</span>
            </div>
          )}
          {selectedCar.battery !== 'NaN' && ( // הסתרה אם הערך battery הוא 'NaN'
            <div>
              <BiSolidBatteryLow />
              <span>{selectedCar.battery}</span>
            </div>
          )}
          <div>
          <PiSeatFill />
            <span>{selectedCar.seats}</span>
          </div>
        </div>
      {!showInvitation && ( // הצגת כפתור "הזמן עכשיו" אם ה-Invitation לא מוצג
        <button className="order-btn" onClick={handleOrderClick}>order now</button>
      )}

    <div className="info-window">
      {reservationData ? (
        <OrderView 
          selectedCar={selectedCar}
          reservationData={reservationData}
          onConfirmOrder={handleConfirmOrder}
        />
      ) : (
        <>
          {showInvitation ? (
            <Invitation 
              selectedCar={selectedCar}
              onCheckAvailability={handleCheckAvailability}
            />
          ) : (
            <>
              <button onClick={() => setShowMore(!showMore)} className="show-more-button">more details</button>
              {showMore && (
                <animated.div style={carouselAnimation} className="carousel">
                  <ImageCarousel images={[selectedCar.image, selectedCar.image1, selectedCar.image2, selectedCar.image3, selectedCar.image4, selectedCar.image5]} />
                </animated.div>
              )}
            </>
          )}
        </>
      )}
    </div>

    </div>
  );
};

export default CarInfoWindow;
