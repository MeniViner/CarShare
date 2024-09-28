import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format, isBefore } from 'date-fns';

import { db } from '../data/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import Swal from 'sweetalert2';
import '../styles/orderView.css';


const OrderView = ({ selectedCar, reservationData, onConfirmOrder }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { startDate, startTime, endDate, endTime, selectedHours, selectedDays, totalCost } = reservationData;
  const navigate = useNavigate();

  const handleConfirmOrder = useCallback(async () => {
    setIsLoading(true);
    
    const reservationId = Date.now().toString(36) + Math.random().toString(36).substr(2);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setIsLoading(false);
      Swal.fire({
        title: t('error'),
        text: t('user not authenticated'),
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: t('connect now'),  
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/profile');  
        }
      });
      return;
    }

    const now = new Date();
    const reservationStart = new Date(`${startDate}T${startTime}`);

    if (isBefore(reservationStart, now)) {
      setIsLoading(false);
      Swal.fire(
        t('invalid booking date'), 
        `${t('cannot book for past dates')} ${t('please select a future date for vehicle reservation')}`, 
        'error'
      );
      return;
    }

    try {
      // Check for existing reservations
      const reservationsRef = collection(db, 'reservations');
      const q = query(
        reservationsRef, 
        where('userId', '==', user.uid),
        where('carId', '==', selectedCar.id),
        where('startDate', '==', startDate)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setIsLoading(false);
        Swal.fire(t('error'), t('you already have a reservation for this car on this date'), 'error');
        return;
      }

      await addDoc(collection(db, 'reservations'), {
        reservationId,
        carId: selectedCar.id,
        startDate,
        startTime,
        endDate,
        endTime,
        selectedHours,
        selectedDays,
        totalCost,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
      });

      setIsLoading(false);

      Swal.fire({
        title: t('order confirmed'),
        text: t('car reserved successfully'),
        icon: 'success',
        timer: 3000,
        showCancelButton: false,
        confirmButtonText: t('go to reservation'),  
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/my-reservations');  
        }
      });

      onConfirmOrder(); //עדכון CarInfoWindow שמאפסת את נתוני ההזמנה 
    } catch (error) {
      console.error("Error adding reservation: ", error);
      setIsLoading(false);
      Swal.fire(t('error'), t('failed to reserve car'), 'error');
    }
  }, [t, selectedCar.id, startDate, startTime, endDate, endTime, selectedHours, selectedDays, totalCost, navigate, onConfirmOrder]);

  const orderDetails = useMemo(() => [
    { label: t('from'), value: `${format(new Date(startDate), 'dd/MM/yyyy')} ${t('at')} ${startTime}` },
    { label: t('until'), value: `${format(new Date(endDate), 'dd/MM/yyyy')} ${t('at')} ${endTime}` },
    { label: t('duration'), value: `${selectedDays} ${t('days')} ${t('and')} ${selectedHours} ${t('hours')}` },
    { label: t('unlock fee'), value: `₪${selectedCar.unlockFee}` },
    { label: t('total cost'), value: `₪${totalCost}`, className: 'total-cost' }
  ], [t, startDate, startTime, endDate, endTime, selectedDays, selectedHours, selectedCar.unlockFee, totalCost]);

  return (
    <div className="order-view-container">
      <h3>{t('order details for')} {selectedCar.brand} {selectedCar.model}</h3>
      <div className="order-details">
        {orderDetails.map((detail, index) => (
          <p key={index} className={detail.className}>
            <strong>{detail.label}:</strong> {detail.value}
          </p>
        ))}
      </div>
      <button 
        className="confirm-button"
        onClick={handleConfirmOrder}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="loading-spinner" />
        ) : (
          t('confirm order')
        )}
      </button>
    </div>
  );
};

export default React.memo(OrderView);

