import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { format, differenceInHours, differenceInDays, isBefore } from 'date-fns';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../data/firebaseConfig';
import '../styles/orderView.css';


const OrderView = ({ selectedCar, reservationData, onConfirmOrder }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { startDate, startTime, endDate, endTime, selectedHours, selectedDays, isHourly } = reservationData;
  const navigate = useNavigate();

  const calculateActualCost = useCallback(() => {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const hoursDiff = differenceInHours(end, start);
    const daysDiff = differenceInDays(end, start);

    let cost = 0;
    if (isHourly) {
      cost = hoursDiff * selectedCar.pricePerHour;
    } else {
      cost = daysDiff * selectedCar.pricePerDay;
      const remainingHours = hoursDiff % 24;
      cost += remainingHours * selectedCar.pricePerHour;
    }

    return Math.max(cost + selectedCar.unlockFee, 0);
  }, [startDate, startTime, endDate, endTime, isHourly, selectedCar.pricePerHour, selectedCar.pricePerDay, selectedCar.unlockFee]);

  const actualCost = useMemo(() => calculateActualCost(), [calculateActualCost]);

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
        confirmButtonText: t('connect now'),  // Customize the button text
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/profile');  // Redirect on button click
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

      // Add the reservation to Firebase
      await addDoc(collection(db, 'reservations'), {
        reservationId,
        carId: selectedCar.id,
        startDate,
        startTime,
        endDate,
        endTime,
        selectedHours,
        selectedDays,
        totalCost: actualCost,
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
      });

      setIsLoading(false);

      Swal.fire({
        title: t('order confirmed'),
        text: t('car reserved successfully'),
        icon: 'success',
        timer: 4000,
        showCancelButton: false,
        showConfirmButton: false,
        html: `<button id="go-to-reservation" class="swal2-confirm swal2-styled">${t('go to reservation')}</button>`,
        didRender: () => {
          document.getElementById('go-to-reservation').addEventListener('click', () => {
            navigate('/my-reservations');
          });
        }
      });

      onConfirmOrder();
    } catch (error) {
      console.error("Error adding reservation: ", error);
      setIsLoading(false);
      Swal.fire(t('error'), t('failed to reserve car'), 'error');
    }
  }, [t, selectedCar.id, startDate, startTime, endDate, endTime, selectedHours, selectedDays, actualCost, navigate, onConfirmOrder]);

  const orderDetails = useMemo(() => [
    { label: t('from'), value: `${format(new Date(startDate), 'dd/MM/yyyy')} ${t('at')} ${startTime}` },
    { label: t('until'), value: `${format(new Date(endDate), 'dd/MM/yyyy')} ${t('at')} ${endTime}` },
    { label: t('duration'), value: `${selectedDays} ${t('days')} ${t('and')} ${selectedHours} ${t('hours')}` },
    { label: t('unlock fee'), value: `₪${selectedCar.unlockFee}` },
    { label: t('total cost'), value: `₪${actualCost}`, className: 'total-cost' }
  ], [t, startDate, startTime, endDate, endTime, selectedDays, selectedHours, selectedCar.unlockFee, actualCost]);

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




// **אופטימיזציה של פונקציות**: השתמשנו ב-`useCallback` לפונקציות `calculateActualCost` ו-`handleConfirmOrder` כדי למנוע יצירה מחדש של פונקציות בכל רינדור.
// **שימוש ב-`useMemo`**: השתמשנו ב-`useMemo` לחישוב `actualCost` ו-`orderDetails` כדי למנוע חישובים מיותרים.
// **שיפור ביצועים**: הוצאנו את רינדור פרטי ההזמנה למערך `orderDetails` שמחושב מראש, כדי למנוע רינדור מיותר.
// **קוד נקי יותר**: ארגנו מחדש את הקוד כדי לשפר את הקריאות והתחזוקתיות שלו.
// **שימוש ב-`React.memo`**: עטפנו את הקומפוננטה כולה ב-`React.memo` כדי למנוע רינדורים מיותרים כאשר ה-props לא משתנים.
// **שמירה על כל התוכן**: כפי שנדרש, שמרנו על כל התוכן והפונקציונליות של הקומפוננטה המקורית.

// Users cannot book for past dates.
// Users cannot make duplicate reservations for the same car on the same date.
// The reservation process is more robust and user-friendly.