import React, { useState, useRef, useEffect } from 'react';
import ImageCarousel from '../assets/ImageCarousel';
import '../styles/infoWindow.css';
import Invitation from './Invitation';
import OrderView from './OrderView';
import Swal from 'sweetalert2';
import { calculateDistance } from '../utils/distanceCalculator';

//icons
import { CiLocationArrow1 } from "react-icons/ci";
import { BiSolidBatteryLow } from "react-icons/bi";
import { BsFuelPumpFill } from "react-icons/bs";
import { PiSeatFill } from "react-icons/pi";
import { FaPersonWalking } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { MdLocationOff, MdOutlineCalendarMonth  } from "react-icons/md";

//animations
import { useSpring, animated } from '@react-spring/web'; //animation for slow open the more details


const CarInfoWindow = ({ selectedCar, onCloseClick, userLocation }) => {

  const distance = calculateDistance(userLocation, selectedCar.coordinates);

  const formatDistance = (distance) => {
    distance = distance.toString(); // Convert distance to string
    if (parseFloat(distance) > 1000) {
      return (parseFloat(distance) / 1000).toFixed(0) + " km";
    } else {
      return parseFloat(distance).toFixed(0) + " meter";
    }
  };  

  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null); 

  const [showInvitation, setShowInvitation] = useState(false);
  const handleOrderClick = () => {
    setShowInvitation(true);
    setShowMore(false); // הסתרת ה-"showMore" אם ה-Invitation מוצג
  };


  const [reservationData, setReservationData] = useState(null);

  // const handleCheckAvailability = (data) => {
  //   const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
  //   const isAvailable = !storedReservations.some(reservation =>
  //     reservation.carId === selectedCar.id &&
  //     ((new Date(`${reservation.startDate}T${reservation.startTime}`) < new Date(`${reservation.endDate}T${reservation.endTime}`)) &&
  //      (new Date(`${data.startDate}T${data.startTime}`) < new Date(`${data.endDate}T${data.endTime}`)))
  //   );
  
  //   if (isAvailable) {
  //     setReservationData(data);
  //   } else {
  //     Swal.fire('לא זמין', 'הרכב אינו זמין לתאריכים ולשעות שנבחרו', 'error');
  //   }
  // };

  const handleCheckAvailability = (data) => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const newStartTime = new Date(`${data.startDate}T${data.startTime}`);
    const newEndTime = new Date(`${data.endDate}T${data.endTime}`);
  
    const isAvailable = !storedReservations.some(reservation => {
      if (reservation.carId !== selectedCar.id) return false;
  
      const reservationStart = new Date(`${reservation.startDate}T${reservation.startTime}`);
      const reservationEnd = new Date(`${reservation.endDate}T${reservation.endTime}`);
  
      return (newStartTime < reservationEnd && newEndTime > reservationStart);
    });
  
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
  }, [onCloseClick]);  

  return (
    <div className='info-window-page'>

      <div ref={ref} className="vehicle-info"> {/* הוסף את ref ל-div הראשי */}

        <div className="process-steps">
          <div className="step">
            <CiLocationArrow1 className='icon'/>
            <p>step 1</p>
          </div>
          <div className="step">
            <MdOutlineCalendarMonth className='icon'/>
            <p>step 2</p>
          </div>
          <div className="step">
            <IoReceiptOutline className='icon'/>
            <p>step 3</p>
          </div>
        </div>

        <div className="vehicle-info-header">
          <div className="vehicle-info-header-name">
            <div className="vehicle-info-header-brand">
              <h1 className="sticky">{selectedCar.brand}</h1>
            </div>
            <div className="vehicle-info-header-model">
              <h3>{selectedCar.model} {selectedCar.year}</h3>
            </div>
          </div>
          <img
            src={selectedCar.image}
            alt={`${selectedCar.brand} ${selectedCar.model}`}
            className="vehicle-info-image"
          />
        </div>

        <div className="vehicle-info-details">
          { distance ? ( //ask if ther is a distance set
              <div>
                <FaPersonWalking />
                <span>{formatDistance(distance)}</span>
              </div>
            ) : ( 
              <div>
                <MdLocationOff />
              </div>
            ) 
          }

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
          <button className="order-btn" onClick={handleOrderClick}>ORDER NOW</button>
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
                  <button onClick={() => setShowMore(!showMore)} className="show-more-button">
                    {showMore ? 'less details <' : 'more details >'}
                  </button>
                  {showMore && (
                    <>
                      <div className="vehicle-info-details">
                        
                      </div>
                        
                      

                      <animated.div style={carouselAnimation} className="carousel">
                        <ImageCarousel images={[selectedCar.image, selectedCar.image1, selectedCar.image2, selectedCar.image3, selectedCar.image4, selectedCar.image5]} />
                      </animated.div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default CarInfoWindow;
