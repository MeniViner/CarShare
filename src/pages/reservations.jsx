import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingPage from '../assets/LoadingPage';

import { db } from '../data/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { fetchCarsFromFirebase } from '../data/fetchCars';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

import Swal from 'sweetalert2';
import '../styles/reservations.css';


const Reservations = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('active');
  const [activeReservations, setActiveReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    console.log("Fetching data started...");
    try {
      const fetchedCars = await fetchCarsFromFirebase();
      console.log("Cars fetched: ", fetchedCars);
      setCars(fetchedCars);
      await loadReservations(fetchedCars);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire(t('error'), t('Please refresh the page and try again'), 'error');
    } finally {
      setIsLoading(false);
      console.log("Fetching data ended.");
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadReservations = async (carData) => {
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
        const car = carData.find(car => car.id === reservation.carId);
        return {
          ...reservation,
          id: doc.id,
          carDetails: car ? {
            brand: car.brand,
            model: car.model,
            year: car.year,
            image: car.image1
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
      throw error;
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
          await loadReservations(cars);
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
      await loadReservations(cars);
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
          await loadReservations(cars);
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
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Reservations;
