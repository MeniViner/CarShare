import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/invitation.css';

const Invitation = ({ selectedCar, onCheckAvailability }) => {
  const [isHourly, setIsHourly] = useState(true);
  const [selectedHours, setSelectedHours] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date().toTimeString().slice(0, 5));
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000).toTimeString().slice(0, 5));
  const [selectedDays, setSelectedDays] = useState(1);

  const handleTabClick = (hourly) => {
    setIsHourly(hourly);
  };

  const incrementHours = () => setSelectedHours(prev => prev + 1);
  const decrementHours = () => setSelectedHours(prev => (prev > 1 ? prev - 1 : 1));

  const incrementDays = () => {
    setSelectedDays(prev => prev + 1);
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + selectedDays + 1);
    setEndDate(newEndDate);
  };
  const decrementDays = () => {
    setSelectedDays(prev => (prev > 1 ? prev - 1 : 1));
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + selectedDays - 1);
    setEndDate(newEndDate);
  };

  const increment = (type) => {
    if (type === 'hours') {
      setSelectedHours(prev => prev + 1);
      const newEndTime = new Date(startDate);
      newEndTime.setHours(newEndTime.getHours() + selectedHours + 1);
      setEndTime(newEndTime.toTimeString().slice(0, 5));
    } else if (type === 'days') {
      setSelectedDays(prev => prev + 1);
      const newEndDate = new Date(startDate);
      newEndDate.setDate(newEndDate.getDate() + selectedDays + 1);
      setEndDate(newEndDate);
    }
  };
  
  const decrement = (type) => {
    if (type === 'hours') {
      setSelectedHours(prev => (prev > 1 ? prev - 1 : 1));
      const newEndTime = new Date(startDate);
      newEndTime.setHours(newEndTime.getHours() + selectedHours - 1);
      setEndTime(newEndTime.toTimeString().slice(0, 5));
    } else if (type === 'days') {
      setSelectedDays(prev => (prev > 1 ? prev - 1 : 1));
      const newEndDate = new Date(startDate);
      newEndDate.setDate(newEndDate.getDate() + selectedDays - 1);
      setEndDate(newEndDate);
    }
  };

  const handleDateChange = (field, value) => {
    if (isNaN(Date.parse(value))) {
      return; // טיפול בתאריך לא תקין
    }

    
    const date = new Date(value);
    if (field === 'start') {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(date); // אם התאריך ההתחלתי גדול יותר, נעדכן גם את תאריך הסיום
      }
    } else {
      if (date < startDate) {
        setEndDate(startDate); // אם תאריך הסיום קטן מהתאריך ההתחלתי, נעדכן אותו לתאריך ההתחלתי
      } else {
        setEndDate(date);
      }
      setSelectedDays(Math.ceil((date - startDate) / (24 * 60 * 60 * 1000)));
    }
  };
  
  const handleTimeChange = (field, value) => {
    const [hours, minutes] = value.split(':').map(Number);
    if (field === 'start') {
      setStartTime(value);
      if (new Date(`1970-01-01T${value}`) >= new Date(`1970-01-01T${endTime}`)) {
        const newEndTime = `${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setEndTime(newEndTime); // אם שעת ההתחלה גדולה משעת הסיום, נעדכן את שעת הסיום
      }
    } else {
      if (new Date(`1970-01-01T${value}`) <= new Date(`1970-01-01T${startTime}`)) {
        setEndTime(startTime); // אם שעת הסיום קטנה משעת ההתחלה, נעדכן את שעת הסיום לשעת ההתחלה
      } else {
        setEndTime(value);
      }
    }
  };


  const calculateCost = () => {
    if (isHourly) {
      return selectedHours * selectedCar.pricePerHour;
    } else {
      return selectedDays * selectedCar.pricePerDay;
    }
  };

  // בדיקת זמינות
  const handleCheckAvailability = () => {
    const reservationData = {
      startDate: startDate.toISOString().split('T')[0],
      startTime,
      endDate: endDate.toISOString().split('T')[0],
      endTime,
      selectedHours,
      selectedDays,
    };
    onCheckAvailability(reservationData);
  };


  
  return (
    <div className="invitation-container">
      <div className="tabs">
        <button 
          className={`tab ${isHourly ? 'active' : ''}`} 
          onClick={() => handleTabClick(true)}
        >
          לפי שעה
        </button>
        <button 
          className={`tab ${!isHourly ? 'active' : ''}`} 
          onClick={() => handleTabClick(false)}
        >
          לפי יום
        </button>
      </div>

      <div className="date-time-selection">
        <label>מתאריך</label>
        <input 
          type="date" 
          value={startDate.toISOString().substring(0, 10)}
          onChange={(e) => handleDateChange('start', e.target.value)}
        />
        <input 
          type="time" 
          value={startTime}
          onChange={(e) => handleTimeChange('start', e.target.value)}
        />
        <label>עד תאריך</label>
        <input 
          type="date" 
          value={endDate.toISOString().substring(0, 10)}
          onChange={(e) => handleDateChange('end', e.target.value)}
        />
        <input 
          type="time" 
          value={endTime}
          onChange={(e) => handleTimeChange('end', e.target.value)}
        />
      </div>

      {isHourly ? (
        <div className="hourly-rental">
          <label>שעות</label>
          <div className="input-group">
            <button onClick={decrementHours}><FaMinus /></button>
            <input 
              className="no-spinner"
              type="number" 
              min="1" 
              value={selectedHours} 
              onChange={(e) => setSelectedHours(Math.max(1, e.target.value))} 
            />
            <button onClick={incrementHours}><FaPlus /></button>
          </div>
        </div>
      ) : (
        <div className="daily-rental">
          <label>ימים</label>
          <div className="input-group">
            <button onClick={decrementDays}><FaMinus /></button>
            <input 
              className="no-spinner"
              type="number" 
              min="1" 
              value={selectedDays} 
              onChange={(e) => setSelectedDays(Math.max(1, e.target.value))} 
            />
            <button onClick={incrementDays}><FaPlus /></button>
          </div>
        </div>
      )}

      <div className="cost-summary">
        <p>סה"כ עלות: {calculateCost()} ₪</p>
        <button onClick={handleCheckAvailability}>בדוק זמינות</button>
      </div>
    </div>
  );
};

export default Invitation;
