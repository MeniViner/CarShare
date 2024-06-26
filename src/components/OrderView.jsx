import React from 'react';
import Swal from 'sweetalert2';
import '../styles/orderView.css';

const OrderView = ({ selectedCar, reservationData, onConfirmOrder }) => {
  const { startDate, startTime, endDate, endTime, selectedHours, selectedDays } = reservationData;

  const handleConfirmOrder = () => {
    // עדכון הזמנים שבהם הרכב תפוס ב- localStorage
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];

    const isOverlapping = storedReservations.some(reservation =>
        reservation.carId === selectedCar.id &&
        ((new Date(`${reservation.startDate}T${reservation.startTime}`) < new Date(`${reservation.endDate}T${reservation.endTime}`)) &&
         (new Date(`${startDate}T${startTime}`) < new Date(`${endDate}T${endTime}`)))
    );
    
    if (isOverlapping) {
        Swal.fire('התנגשות בזמנים', 'הרכב כבר הוזמן בתאריכים ובשעות שנבחרו', 'error');
        return;
    }

    storedReservations.push({
      carId: selectedCar.id,
      startDate,
      startTime,
      endDate,
      endTime,
      selectedHours,
      selectedDays,
    });
    
    localStorage.setItem('reservations', JSON.stringify(storedReservations));
    Swal.fire('הזמנה אושרה', 'הרכב הוזמן בהצלחה!', 'success');
    onConfirmOrder();
  };

  return (
    <div className="order-view-container">
      <h3>פרטי הזמנה עבור {selectedCar.brand} {selectedCar.model}</h3>
      <p>מתאריך: {new Date(startDate).toLocaleDateString()} בשעה: {startTime}</p>
      <p>עד תאריך: {new Date(endDate).toLocaleDateString()} בשעה: {endTime}</p>
      <p>שעות: {selectedHours}</p>
      <p>ימים: {selectedDays}</p>
      <button onClick={handleConfirmOrder}>הזמן עכשיו</button>
    </div>
  );
};

export default OrderView;
