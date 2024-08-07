// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import '../styles/reservations.css';
// import cars from '../data/carsData'; // Import the cars data

// const Reservations = () => {
//   const [activeReservations, setActiveReservations] = useState([]);
//   const [pastReservations, setPastReservations] = useState([]);

//   useEffect(() => {
//     loadReservations();
//   }, []);

//   const loadReservations = () => {
//     const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
//     const now = new Date();

//     // Add car details to each reservation
//     const reservationsWithCarDetails = storedReservations.map(reservation => {
//       const car = cars.find(car => car.id === reservation.carId);
//       return {
//         ...reservation,
//         carDetails: car ? {
//           brand: car.brand,
//           model: car.model,
//           year: car.year,
//           image: car.image
//         } : null
//       };
//     });

//     const active = reservationsWithCarDetails.filter(reservation => 
//       new Date(`${reservation.endDate}T${reservation.endTime}`) > now
//     );
//     const past = reservationsWithCarDetails.filter(reservation => 
//       new Date(`${reservation.endDate}T${reservation.endTime}`) <= now
//     );

//     setActiveReservations(active);
//     setPastReservations(past);
//   };

//   const cancelReservation = (reservationId) => {
//     Swal.fire({
//       title: 'האם אתה בטוח?',
//       text: "לא תוכל לבטל פעולה זו!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'כן, בטל הזמנה!',
//       cancelButtonText: 'ביטול'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedReservations = activeReservations.filter(res => res.id !== reservationId);
//         localStorage.setItem('reservations', JSON.stringify([...updatedReservations, ...pastReservations]));
//         loadReservations();
//         Swal.fire(
//           'בוטל!',
//           'ההזמנה שלך בוטלה.',
//           'success'
//         );
//       }
//     });
//   };

//   const ReservationCard = ({ reservation, isActive }) => (
//     <div className="reservation-card">
//       {reservation.carDetails && (
//         <>
//           <img src={reservation.carDetails.image} alt={`${reservation.carDetails.brand} ${reservation.carDetails.model}`} className="car-image" />
//           <h3>{reservation.carDetails.brand} {reservation.carDetails.model} ({reservation.carDetails.year})</h3>
//         </>
//       )}
//       <p>מתאריך: {new Date(reservation.startDate).toLocaleDateString()} בשעה: {reservation.startTime}</p>
//       <p>עד תאריך: {new Date(reservation.endDate).toLocaleDateString()} בשעה: {reservation.endTime}</p>
//       <p>שעות: {reservation.selectedHours}</p>
//       <p>ימים: {reservation.selectedDays}</p>
//       <p>סה"כ עלות: {reservation.totalCost}</p>
//       {isActive && <button onClick={() => cancelReservation(reservation.id)}>בטל הזמנה</button>}
//     </div>
//   );

//   return (
//     <div className="my-reservations">
//       <h2>ההזמנות הפעילות שלי</h2>
//       {activeReservations.map(reservation => (
//         <ReservationCard key={reservation.id} reservation={reservation} isActive={true} />
//       ))}

//       <h2>היסטוריית הזמנות</h2>
//       {pastReservations.map(reservation => (
//         <ReservationCard key={reservation.id} reservation={reservation} isActive={false} />
//       ))}
//     </div>
//   );
// };

// export default Reservations;
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../styles/reservations.css';
import cars from '../data/carsData';

const Reservations = () => {
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
    localStorage.setItem('reservations', JSON.stringify([...activeReservations, ...updatedPastReservations]));
    loadReservations();
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
        loadReservations();
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

      <div className="reservations-list">
        <h2>ההזמנות הפעילות שלי</h2>
        {activeReservations.length === 0 ? (
          <p className="no-reservations-message">אין הזמנות פעילות כרגע</p>
        ) : (
          <>
            {activeReservations.map(reservation => (
              <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={true} />
            ))}
          </>
        )}
      </div>

      <div className="reservations-list">
        <h2>היסטוריית הזמנות</h2>
        {pastReservations.length === 0 ? (
          <p className="no-reservations-message">אין היסטוריית הזמנות</p>
        ) : (
          <>
            <button onClick={clearAllHistory}><h2>מחק את כל ההיסטוריה</h2></button>
            {pastReservations.map(reservation => (
              <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={false} />
            ))}
          </>
        )}
      </div>

    </div>
  );
};

export default Reservations;