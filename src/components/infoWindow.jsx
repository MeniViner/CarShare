import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

// Components
import ImageCarousel from '../assets/ImageCarousel';
import Invitation from './Invitation';
import OrderView from './OrderView';

// Utilities
import { calculateDistance } from '../utils/distanceCalculator';

// Icons
import { CiLocationArrow1 } from "react-icons/ci";
import { BiSolidBatteryLow } from "react-icons/bi";
import { BsFuelPumpFill } from "react-icons/bs";
import { PiSeatFill } from "react-icons/pi";
import { FaPersonWalking } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import { MdLocationOff, MdOutlineCalendarMonth } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";

// Animations
import { useSpring, animated } from '@react-spring/web';

// Styles
import '../styles/infoWindow.css';


const CarInfoWindow = ({ selectedCar, onCloseClick, userLocation }) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const distance = useMemo(() => calculateDistance (
    userLocation, 
    selectedCar.coordinates
  ), [userLocation, selectedCar.coordinates]);
  const formatDistance = useCallback((distance) => {
    const distanceInMeters = parseFloat(distance);
    return distanceInMeters > 1000 
      ? `${(distanceInMeters / 1000).toFixed(0)} km`
      : `${distanceInMeters.toFixed(0)} meter`;
  }, []);

  const handleOrderClick = useCallback(() => {
    setShowInvitation(true);
    setShowMore(false);
  }, []);

  const handleCheckAvailability = useCallback((data) => {
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
      Swal.fire(t('not available'), t('car not available for selected dates and times'), 'error');
    }
  }, [selectedCar.id, t]);
  
  const handleConfirmOrder = useCallback(() => {
    setReservationData(null);
    onCloseClick();
  }, [onCloseClick]);

  const carouselAnimation = useSpring({
    opacity: showMore ? 1 : 0,
    transform: showMore ? 'translateY(0)' : 'translateY(-20px)',
    config: { duration: 300 },
  });

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

  const renderVehicleDetails = useMemo(() => (
    <div className="vehicle-info-details">
      {distance ? (
        <div>
          <FaPersonWalking />
          <span>{formatDistance(distance)}</span>
        </div>
      ) : (
        <div>
          <MdLocationOff />
        </div>
      )}

      {selectedCar.fuel !== 'NaN' && (
        <div>
          <BsFuelPumpFill />
          <span>{selectedCar.fuel}</span>
        </div>
      )}
      {selectedCar.battery !== 'NaN' && (
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
  ), [distance, formatDistance, selectedCar.fuel, selectedCar.battery, selectedCar.seats]);

  return (
    <div className='info-window-page'>
      <div ref={ref} className="vehicle-info">
        <div className="process-steps">
          <div className="step">
            <CiLocationArrow1 className='icon'/>
            <p>{t('step 1')}</p>
          </div>
          <div className="step">
            <MdOutlineCalendarMonth className='icon'/>
            <p>{t('step 2')}</p>
          </div>
          <div className="step">
            <IoReceiptOutline className='icon'/>
            <p>{t('step 3')}</p>
          </div>
        </div>

        <div className="vehicle-info-header">
          <div className="vehicle-info-header-name">
            <div className="vehicle-info-header-brand">
              <h1 className="sticky">{selectedCar.brand}</h1>
            </div>
            <div className="vehicle-info-header-model ">
              <h3>{selectedCar.model} {selectedCar.year}</h3>
            </div>
            <div className="vehicle-info-header-model vihm2">
              <h3><TfiLocationPin/>{selectedCar.address.street}, &nbsp;{selectedCar.address.city}</h3>
            </div>

          </div>
          <img
            src={selectedCar.image}
            alt={`${selectedCar.brand} ${selectedCar.model}`}
            className="vehicle-info-image"
          />
        </div>

        {renderVehicleDetails}

        {!showInvitation && (
          <button className="order-btn" onClick={handleOrderClick}>
            {t('order now')}
          </button>
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
                    {showMore ? t('less details') : t('more details')}
                  </button>
                  {showMore && (
                    <>
                      <animated.div style={carouselAnimation} className="carousel">
                        <ImageCarousel images={[selectedCar.image5, selectedCar.image4, selectedCar.image3, selectedCar.image2, selectedCar.image1, selectedCar.image]} />
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

export default React.memo(CarInfoWindow);
