import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format, addHours, addDays, differenceInHours, differenceInDays } from 'date-fns';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import '../styles/invitation.css';

const Invitation = ({ selectedCar, onCheckAvailability }) => {
  const { t } = useTranslation();
  const [isHourly, setIsHourly] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(format(addHours(new Date(), 1), 'HH:mm'));
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = useCallback((start, end) => {
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
  }, [isHourly, selectedCar.pricePerHour, selectedCar.pricePerDay, selectedCar.unlockFee]);

  // הוספת דקה אחת לשעה הנוכחית
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 1);
    const formattedTime = format(currentDate, 'HH:mm');
    setStartTime(formattedTime); 
    setEndTime(format(addHours(currentDate, 1), 'HH:mm'));
  }, []); 

  useEffect(() => {
    const start = new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
    const end = new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);
    const cost = calculateCost(start, end);
    setTotalCost(cost);
  }, [startDate, startTime, endDate, endTime, calculateCost]);

  const handleTabClick = useCallback((hourly) => {
    setIsHourly(hourly);
  }, []);

  const handleDateChange = useCallback((field, value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return;

    if (field === 'start') {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(date);
      }
    } else {
      if (date < startDate) {
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const handleTimeChange = useCallback((field, value) => {
    const [hours, minutes] = value.split(':').map(Number);
    const date = field === 'start' ? startDate : endDate;
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);

    if (field === 'start') {
      setStartTime(value); 

      // תמיד לעדכן את שעת הסיום כך שתהיה לפחות שעה אחרי שעת ההתחלה
      const newEndTime = format(addHours(newDate, 1), 'HH:mm');
      setEndTime(newEndTime);
      
      if (newDate >= new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`)) {
        setEndTime(format(addHours(newDate, 1), 'HH:mm')); 
      }
    } else {
      if (newDate <= new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`)) {
        setEndTime(startTime);
      } else {
        setEndTime(value);
      }
    }
  }, [startDate, endDate, startTime, endTime]);

  const updateSelectedDaysAndHours = useCallback(() => {
    const start = new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
    const end = new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);
    const days = differenceInDays(end, start);
    const hours = differenceInHours(end, start) % 24;
    setSelectedDays(days);
    setSelectedHours(hours);
  }, [startDate, startTime, endDate, endTime]);

  useEffect(() => {
    updateSelectedDaysAndHours();
  }, [startDate, startTime, endDate, endTime, updateSelectedDaysAndHours]);

  const increment = useCallback((type) => {
    let newEndDate = new Date(endDate);
    if (type === 'days') {
      newEndDate = addDays(newEndDate, 1);
    } else if (type === 'hours') {
      newEndDate = addHours(newEndDate, 1);
    }
    setEndDate(newEndDate);
    setEndTime(format(newEndDate, 'HH:mm'));
  }, [endDate]);

  const decrement = useCallback((type) => {
    let newEndDate = new Date(endDate);
    if (type === 'days' && selectedDays > 0) {
      newEndDate = addDays(newEndDate, -1);
    } else if (type === 'hours' && (selectedDays > 0 || selectedHours > 1)) {
      newEndDate = addHours(newEndDate, -1);
    } else {
      return;
    }
    
    if (newEndDate > startDate) {
      setEndDate(newEndDate);
      setEndTime(format(newEndDate, 'HH:mm'));
    }
  }, [endDate, selectedDays, selectedHours, startDate]);

  const handleCheckAvailability = useCallback(() => {
    const reservationData = {
      startDate: format(startDate, 'yyyy-MM-dd'),
      startTime,
      endDate: format(endDate, 'yyyy-MM-dd'),
      endTime,
      selectedHours,
      selectedDays,
      totalCost,
      isHourly
    };
    onCheckAvailability(reservationData);
  }, [startDate, startTime, endDate, endTime, selectedHours, selectedDays, totalCost, isHourly, onCheckAvailability]);

  const renderDateTimeSelection = useMemo(() => (
    <div className="datetime-selection">
      <div className="datetime-group">
        <label>{t('start')}</label>
        <div className="input-wrapper">
          <input 
            type="time" 
            value={startTime}
            onChange={(e) => handleTimeChange('start', e.target.value)}
          />
          <input 
            type="date" 
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={(e) => handleDateChange('start', e.target.value)}
          />
        </div>
      </div>
      
      <div className="datetime-group">
        <label>{t('end')}</label>
        <div className="input-wrapper">
          <input 
            type="time" 
            value={endTime}
            onChange={(e) => handleTimeChange('end', e.target.value)}
          />
          <input 
            type="date" 
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={(e) => handleDateChange('end', e.target.value)}
          />
        </div>
      </div>
    </div>
  ), [t, startTime, startDate, endTime, endDate, handleTimeChange, handleDateChange]);

  const renderDurationSelection = useMemo(() => (
    <div className="duration-selection">
      <div className="duration-group">
        <label>{t('total hours')}</label>
        <div className="counter c-h-d-s">
          <button onClick={() => decrement('hours')} className="counter-button"><FaMinus /></button>
          <input 
            className="counter-input"
            type="number" 
            readOnly
            value={selectedHours} 
          />
          <button onClick={() => increment('hours')} className="counter-button"><FaPlus /></button>
        </div>
      </div>

      <div className="duration-group">
        <label>{t('total days')}</label>
        <div className="counter c-d-d-s">
          <button onClick={() => decrement('days')} className="counter-button"><FaMinus /></button>
          <input 
            className="counter-input"
            type="number" 
            readOnly
            value={selectedDays} 
          />
          <button onClick={() => increment('days')} className="counter-button"><FaPlus /></button>
        </div>
      </div>
    </div>
  ), [t, selectedHours, selectedDays, increment, decrement]);

  return (
    <div className="invitation-container">
      <div className="rental-type-tabs">
        <button 
          className={`tab ${isHourly ? 'active' : ''}`} 
          onClick={() => handleTabClick(true)}
        >
          {t('hourly')}
        </button>
        <button 
          className={`tab ${!isHourly ? 'active' : ''}`} 
          onClick={() => handleTabClick(false)}
        >
          {t('daily')}
        </button>
      </div>
      
      {renderDateTimeSelection}
      {renderDurationSelection}

      <div className="summary">
        <button onClick={handleCheckAvailability} className="check-availability-btn">
          {t('check availability')}
        </button>
        <div className="total-cost">₪{totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default React.memo(Invitation);


// **שימוש ב-`useCallback`**: הוספנו `useCallback` לכל הפונקציות בקומפוננטה כדי למנוע יצירה מחדש של פונקציות בכל רינדור.
// **שימוש ב-`useMemo`**: השתמשנו ב-`useMemo` לחלקים מורכבים של ה-JSX כמו `renderDateTimeSelection` ו-`renderDurationSelection` כדי למנוע רינדור מיותר.
// **אופטימיזציה של `useEffect`**: פיצלנו את ה-`useEffect` הגדול למספר אפקטים קטנים יותר, כל אחד עם תלויות ספציפיות.
// **שיפור ביצועים**: הוצאנו חישובים מורכבים מתוך הרינדור ושמנו אותם בתוך `useCallback` או `useMemo`.
// **שימוש ב-`React.memo`**: עטפנו את הקומפוננטה כולה ב-`React.memo` כדי למנוע רינדורים מיותרים כאשר ה-props לא משתנים.
// **קוד נקי יותר**: ארגנו מחדש את הקוד כדי לשפר את הקריאות והתחזוקתיות שלו.
// **שמירה על כל התוכן**: כפי שנדרש, שמרנו על כל התוכן והפונקציונליות של הקומפוננטה המקורית.