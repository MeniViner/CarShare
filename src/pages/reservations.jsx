// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import '../styles/reservations.css';
// import cars from '../data/carsData';

// const Reservations = () => {
//   const [activeTab, setActiveTab] = useState('active');
//   const [activeReservations, setActiveReservations] = useState([]);
//   const [pastReservations, setPastReservations] = useState([]);

//   useEffect(() => {
//     loadReservations();
//   }, []);

//   const loadReservations = () => {
//     const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
//     const now = new Date();

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
//         const updatedReservations = activeReservations.filter(res => res.reservationId !== reservationId);
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

//   const deleteFromHistory = (reservationId) => {
//     const updatedPastReservations = pastReservations.filter(res => res.reservationId !== reservationId);
//     const updatedAllReservations = [...activeReservations, ...updatedPastReservations];
//     localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));
//     setPastReservations(updatedPastReservations);
//   };
  
//   const clearAllHistory = () => {
//     Swal.fire({
//       title: 'האם אתה בטוח?',
//       text: "פעולה זו תמחק את כל היסטוריית ההזמנות!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'כן, מחק הכל!',
//       cancelButtonText: 'ביטול'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.setItem('reservations', JSON.stringify(activeReservations));
//         setPastReservations([]);
//         Swal.fire(
//           'נמחק!',
//           'היסטוריית ההזמנות נמחקה.',
//           'success'
//         );
//       }
//     });
//   };

//   const ReservationCard = ({ reservation, isActive }) => (
//     <div className="reservation-card">
//       {reservation.carDetails && (
//         <>
//           <div className="car-image-container">
//             <img 
//               className='car-image'
//               src={reservation.carDetails.image} 
//               alt={`${reservation.carDetails.brand} ${reservation.carDetails.model}`} 
//             />
//           </div>
//           <h3>{reservation.carDetails.brand} {reservation.carDetails.model} ({reservation.carDetails.year})</h3>
//         </>
//       )}
//       <div className="reservation-details">
//         <p><span className="icon">📅</span> מתאריך: {new Date(reservation.startDate).toLocaleDateString()} בשעה: {reservation.startTime}</p>
//         <p><span className="icon">🏁</span> עד תאריך: {new Date(reservation.endDate).toLocaleDateString()} בשעה: {reservation.endTime}</p>
//         <p><span className="icon">⏱️</span> שעות: {reservation.selectedHours}</p>
//         <p><span className="icon">📆</span> ימים: {reservation.selectedDays}</p>
//         <p><span className="icon">💰</span> סה"כ עלות: {reservation.totalCost}</p>
//       </div>
//       {isActive ? (
//         <button className="cancel-button" onClick={() => cancelReservation(reservation.reservationId)}>בטל הזמנה</button>
//       ) : (
//         <button className="delete-button" onClick={() => deleteFromHistory(reservation.reservationId)}>מחק מההיסטוריה</button>
//       )}
//     </div>
//   );

//   return (
//     <div className="reservations-container">
//       <header className="reservations-header">
//         <h1>הזמנות</h1>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'active' ? 'active' : ''} 
//             onClick={() => setActiveTab('active')}
//           >
//             הזמנות פעילות
//           </button>
//           <button 
//             className={activeTab === 'history' ? 'active' : ''} 
//             onClick={() => setActiveTab('history')}
//           >
//             היסטוריית הזמנות
//           </button>
//         </div>
//       </header>

//       <div className="reservations-content">
//         {activeTab === 'active' && (
//           <div className="reservations-list">
//             {activeReservations.length === 0 ? (
//               <div className="text-container no-reservations">
//                 <p>אין הזמנות פעילות כרגע</p>
//                 <h4>ברגע שיהיה לך הזמנה פעילה</h4>
//                 <h4>היא תופיע פה</h4>
//                 <div className="n-r-btn">
//                   <Link to="/map" className="sign-in-link">הזמן עכשיו</Link>
//                 </div>
//               </div>
//             ) : (
//               activeReservations.map(reservation => (
//                 <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={true} />
//               ))
//             )}
//           </div>
//         )}

//         {activeTab === 'history' && (
//           <div className="reservations-list">
//             {pastReservations.length === 0 ? (
//               <div className="text-container no-reservations">
//                 <p>היסטוריית ההזמנות שלך ריקה</p>
//                 <h4>רכבים שהשכרת בעבר יופיעו פה</h4>
//                 <div className="n-r-btn">
//                   <Link to="/map" className="sign-in-link">הזמן עכשיו</Link>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <button className="clear-history-button" onClick={clearAllHistory}>מחק את כל ההיסטוריה</button>
//                 {pastReservations.map(reservation => (
//                   <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={false} />
//                 ))}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reservations;







// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useTranslation } from 'react-i18next';
// import '../styles/reservations.css';
// import cars from '../data/carsData';

// const Reservations = () => {
//   const { t } = useTranslation();
//   const [activeTab, setActiveTab] = useState('active');
//   const [activeReservations, setActiveReservations] = useState([]);
//   const [pastReservations, setPastReservations] = useState([]);

//   useEffect(() => {
//     loadReservations();
//   }, []);

//   const loadReservations = () => {
//     const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
//     const now = new Date();

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
//       title: t('are you sure'),
//       text: t('cannot undo action'),
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: t('yes cancel reservation'),
//       cancelButtonText: t('cancel')
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const updatedReservations = activeReservations.filter(res => res.reservationId !== reservationId);
//         localStorage.setItem('reservations', JSON.stringify([...updatedReservations, ...pastReservations]));
//         loadReservations();
//         Swal.fire(
//           t('cancelled'),
//           t('reservation cancelled'),
//           'success'
//         );
//       }
//     });
//   };

//   const deleteFromHistory = (reservationId) => {
//     const updatedPastReservations = pastReservations.filter(res => res.reservationId !== reservationId);
//     const updatedAllReservations = [...activeReservations, ...updatedPastReservations];
//     localStorage.setItem('reservations', JSON.stringify(updatedAllReservations));
//     setPastReservations(updatedPastReservations);
//   };
  
//   const clearAllHistory = () => {
//     Swal.fire({
//       title: t('are you sure'),
//       text: t('delete all history warning'),
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: t('yes delete all'),
//       cancelButtonText: t('cancel')
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.setItem('reservations', JSON.stringify(activeReservations));
//         setPastReservations([]);
//         Swal.fire(
//           t('deleted'),
//           t('reservation history deleted'),
//           'success'
//         );
//       }
//     });
//   };

//   const ReservationCard = ({ reservation, isActive }) => (
//     <div className="reservation-card">
//       {reservation.carDetails && (
//         <>
//           <div className="car-image-container">
//             <img 
//               className='car-image'
//               src={reservation.carDetails.image} 
//               alt={`${reservation.carDetails.brand} ${reservation.carDetails.model}`} 
//             />
//           </div>
//           <h3>{reservation.carDetails.brand} {reservation.carDetails.model} ({reservation.carDetails.year})</h3>
//         </>
//       )}
//       <div className="reservation-details">
//         <p><span className="icon">📅</span> {t('from date')}: {new Date(reservation.startDate).toLocaleDateString()} {t('at time')}: {reservation.startTime}</p>
//         <p><span className="icon">🏁</span> {t('to date')}: {new Date(reservation.endDate).toLocaleDateString()} {t('at time')}: {reservation.endTime}</p>
//         <p><span className="icon">⏱️</span> {t('hours')}: {reservation.selectedHours}</p>
//         <p><span className="icon">📆</span> {t('days')}: {reservation.selectedDays}</p>
//         <p><span className="icon">💰</span> {t('total cost')}: {reservation.totalCost}</p>
//       </div>
//       {isActive ? (
//         <button className="cancel-button" onClick={() => cancelReservation(reservation.reservationId)}>{t('cancel reservation')}</button>
//       ) : (
//         <button className="delete-button" onClick={() => deleteFromHistory(reservation.reservationId)}>{t('delete from history')}</button>
//       )}
//     </div>
//   );

//   return (
//     <div className="reservations-container">
//       <header className="reservations-header">
//         <h1>{t('reservations')}</h1>
//         <div className="tabs">
//           <button 
//             className={activeTab === 'active' ? 'active' : ''} 
//             onClick={() => setActiveTab('active')}
//           >
//             {t('active reservations')}
//           </button>
//           <button 
//             className={activeTab === 'history' ? 'active' : ''} 
//             onClick={() => setActiveTab('history')}
//           >
//             {t('reservation history')}
//           </button>
//         </div>
//       </header>

//       <div className="reservations-content">
//         {activeTab === 'active' && (
//           <div className="reservations-list">
//             {activeReservations.length === 0 ? (
//               <div className="text-container no-reservations">
//                 <p>{t('no active reservations')}</p>
//                 <h4>{t('when you have active reservation')}</h4>
//                 <h4>{t('it will appear here')}</h4>
//                 <div className="n-r-btn">
//                   <Link to="/map" className="sign-in-link">{t('reserve now')}</Link>
//                 </div>
//               </div>
//             ) : (
//               activeReservations.map(reservation => (
//                 <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={true} />
//               ))
//             )}
//           </div>
//         )}

//         {activeTab === 'history' && (
//           <div className="reservations-list">
//             {pastReservations.length === 0 ? (
//               <div className="text-container no-reservations">
//                 <p>{t('reservation history empty')}</p>
//                 <h4>{t('past rented cars appear here')}</h4>
//                 <div className="n-r-btn">
//                   <Link to="/map" className="sign-in-link">{t('reserve now')}</Link>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <button className="clear-history-button" onClick={clearAllHistory}>{t('delete all history')}</button>
//                 {pastReservations.map(reservation => (
//                   <ReservationCard key={reservation.reservationId} reservation={reservation} isActive={false} />
//                 ))}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reservations;











import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../data/firebaseConfig';
import '../styles/reservations.css';
import cars from '../data/carsData';

const Reservations = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('active');
  const [activeReservations, setActiveReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    const now = new Date();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const reservationsRef = collection(db, 'reservations');
      const q = query(reservationsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const reservationsWithCarDetails = querySnapshot.docs.map(doc => {
        const reservation = doc.data();
        const car = cars.find(car => car.id === reservation.carId);
        return {
          ...reservation,
          id: doc.id,
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
    } catch (error) {
      console.error("Error loading reservations: ", error);
      Swal.fire(t('error'), t('failed to load reservations'), 'error');
    }
  };

  const cancelReservation = async (reservationId) => {
    Swal.fire({
      title: t('are you sure'),
      text: t('cannot undo action'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('yes cancel reservation'),
      cancelButtonText: t('cancel')
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, 'reservations', reservationId));
          loadReservations();
          Swal.fire(
            t('cancelled'),
            t('reservation cancelled'),
            'success'
          );
        } catch (error) {
          console.error("Error cancelling reservation: ", error);
          Swal.fire(t('error'), t('failed to cancel reservation'), 'error');
        }
      }
    });
  };

  const deleteFromHistory = async (reservationId) => {
    try {
      await deleteDoc(doc(db, 'reservations', reservationId));
      loadReservations();
    } catch (error) {
      console.error("Error deleting reservation from history: ", error);
      Swal.fire(t('error'), t('failed to delete reservation from history'), 'error');
    }
  };
  
  const clearAllHistory = async () => {
    Swal.fire({
      title: t('are you sure'),
      text: t('delete all history warning'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('yes delete all'),
      cancelButtonText: t('cancel')
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deletePromises = pastReservations.map(reservation => 
            deleteDoc(doc(db, 'reservations', reservation.id))
          );
          await Promise.all(deletePromises);
          loadReservations();
          Swal.fire(
            t('deleted'),
            t('reservation history deleted'),
            'success'
          );
        } catch (error) {
          console.error("Error clearing reservation history: ", error);
          Swal.fire(t('error'), t('failed to clear reservation history'), 'error');
        }
      }
    });
  };

  const ReservationCard = ({ reservation, isActive }) => (
    <div className="reservation-card">
      {reservation.carDetails && (
        <>
          <div className="car-image-container">
            <img 
              className='car-image'
              src={reservation.carDetails.image} 
              alt={`${reservation.carDetails.brand} ${reservation.carDetails.model}`} 
            />
          </div>
          <h3>{reservation.carDetails.brand} {reservation.carDetails.model} ({reservation.carDetails.year})</h3>
        </>
      )}
      <div className="reservation-details">
        <p><span className="icon">📅</span> {t('from date')}: {new Date(reservation.startDate).toLocaleDateString()} {t('at time')}: {reservation.startTime}</p>
        <p><span className="icon">🏁</span> {t('to date')}: {new Date(reservation.endDate).toLocaleDateString()} {t('at time')}: {reservation.endTime}</p>
        <p><span className="icon">⏱️</span> {t('hours')}: {reservation.selectedHours}</p>
        <p><span className="icon">📆</span> {t('days')}: {reservation.selectedDays}</p>
        <p><span className="icon">💰</span> {t('total cost')}: {reservation.totalCost}</p>
      </div>
      {isActive ? (
        <button className="cancel-button" onClick={() => cancelReservation(reservation.id)}>{t('cancel reservation')}</button>
      ) : (
        <button className="delete-button" onClick={() => deleteFromHistory(reservation.id)}>{t('delete from history')}</button>
      )}
    </div>
  );

  return (
    <div className="reservations-container">
      <header className="reservations-header">
        <h1>{t('reservations')}</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'active' ? 'active' : ''} 
            onClick={() => setActiveTab('active')}
          >
            {t('active reservations')}
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            {t('reservation history')}
          </button>
        </div>
      </header>

      <div className="reservations-content">
        {activeTab === 'active' && (
          <div className="reservations-list">
            {activeReservations.length === 0 ? (
              <div className="text-container no-reservations">
                <p>{t('no active reservations')}</p>
                <h4>{t('when you have active reservation')}</h4>
                <h4>{t('it will appear here')}</h4>
                <div className="n-r-btn">
                  <Link to="/map" className="sign-in-link">{t('reserve now')}</Link>
                </div>
              </div>
            ) : (
              activeReservations.map(reservation => (
                <ReservationCard key={reservation.id} reservation={reservation} isActive={true} />
              ))
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="reservations-list">
            {pastReservations.length === 0 ? (
              <div className="text-container no-reservations">
                <p>{t('reservation history empty')}</p>
                <h4>{t('past rented cars appear here')}</h4>
                <div className="n-r-btn">
                  <Link to="/map" className="sign-in-link">{t('reserve now')}</Link>
                </div>
              </div>
            ) : (
              <>
                <button className="clear-history-button" onClick={clearAllHistory}>{t('delete all history')}</button>
                {pastReservations.map(reservation => (
                  <ReservationCard key={reservation.id} reservation={reservation} isActive={false} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;