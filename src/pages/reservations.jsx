import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/reservations.css';
import cars from '../data/carsData';

import DateTimePicker from '../utils/DateTimePicker'


const Reservations = () => {
  const [activeTab, setActiveTab] = useState('active'); // Manage which tab is active
  const [activeReservations, setActiveReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = () => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const now = new Date();

    const reservationsWithCarDetails = storedReservations.map(reservation => {
      const car = cars.find(car => car.id === reservation.carId);
      return {
        ...reservation,
        carDetails: car ? {
          brand: car.brand,
          model: car.model,
          year: car.year,
          image: car.image
        } : null
      };
    });

    const active = reservationsWithCarDetails.filter(reservation =>
      new Date(`${reservation.endDate}T${reservation.endTime}`) > now
    );
    const past = reservationsWithCarDetails.filter(reservation =>
      new Date(`${reservation.endDate}T${reservation.endTime}`) <= now
    );

    setActiveReservations(active);
    setPastReservations(past);
  };

  const cancelReservation = (reservationId) => {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "לא תוכל לבטל פעולה זו!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן, בטל הזמנה!',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedReservations = activeReservations.filter(res => res.reservationId !== reservationId);
        localStorage.setItem('reservations', JSON.stringify([...updatedReservations, ...pastReservations]));
        loadReservations();
        Swal.fire(
          'בוטל!',
          'ההזמנה שלך בוטלה.',
          'success'
        );
      }
    });
  };

  const deleteFromHistory = (reservationId) => {
    const updatedPastReservations = pastReservations.filter(res => res.reservationId !== reservationId);
    const updatedAllReservations = [...activeReservations, ...updatedPastReservations];
    localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));
    setPastReservations(updatedPastReservations);
  };
  
  const clearAllHistory = () => {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "פעולה זו תמחק את כל היסטוריית ההזמנות!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן, מחק הכל!',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('reservations', JSON.stringify(activeReservations));
        setPastReservations([]);
        Swal.fire(
          'נמחק!',
          'היסטוריית ההזמנות נמחקה.',
          'success'
        );
      }
    });
  };


  const ReservationCard = ({ reservation, isActive }) => (
    <div className="reservation-card">
      {reservation.carDetails && (
        <>
          <img 
          className='car-image'
            src={reservation.carDetails.image} 
            alt={`${reservation.carDetails.brand} 
            ${reservation.carDetails.model}`} 
          />
          <h3>{reservation.carDetails.brand} {reservation.carDetails.model} ({reservation.carDetails.year})</h3>
        </>
      )}
      <p>מתאריך: {new Date(reservation.startDate).toLocaleDateString()} בשעה: {reservation.startTime}</p>
      <p>עד תאריך: {new Date(reservation.endDate).toLocaleDateString()} בשעה: {reservation.endTime}</p>
      <p>שעות: {reservation.selectedHours}</p>
      <p>ימים: {reservation.selectedDays}</p>
      <p>סה"כ עלות: {reservation.totalCost}</p>
      {isActive ? (
        <button onClick={() => cancelReservation(reservation.reservationId)}>בטל הזמנה</button>
      ) : (
        <button onClick={() => deleteFromHistory(reservation.reservationId)}>מחק מההיסטוריה</button>
      )}
    </div>
  );

  return (
    <div className="reservations-container">
      <header className="reservations-header">
        <h1>הזמנות</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'active' ? 'active' : ''} 
            onClick={() => setActiveTab('active')}
          >
            הזמנות פעילות
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            היסטוריית הזמנות
          </button>
        </div>
      </header>

      <div className="reservations-content">

        {activeTab === 'active' && (
          <div className="reservations-list">
            {activeReservations.length === 0 ? (
              <div className="text-container no-reservations">
                <p>אין הזמנות פעילות כרגע</p>
                <h4>ברגע שיהיה לך הזמנה פעילה</h4>
                <h4>היא תופיע פה</h4>
                <div className="n-r-btn">
                  <Link to="/map" className="sign-in-link">הזמן עכשיו</Link>
                </div>
              </div>
            ) : (
              <>
                {activeReservations.map(reservation => (
                  <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={true} />
                ))}
              </>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="reservations-list">
            {pastReservations.length === 0 ? (
              <div className="text-container no-reservations">
                <p>אין היסטוריית הזמנות</p>
                <h4>רכבים שהשכרת בעבר יופיעו פה</h4>
                <div className="n-r-btn">
                  <Link to="/map" className="sign-in-link">הזמן עכשיו</Link>
                </div>
              </div>
            ) : (
              <>
                <button onClick={clearAllHistory}><h2>מחק את כל ההיסטוריה</h2></button>
                {pastReservations.map(reservation => (
                  <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={false} />
                ))}
              </>
            )}
          </div>
        )}

{/* <DateTimePicker /> */}

      </div>
    </div>
  );
};

export default Reservations;
