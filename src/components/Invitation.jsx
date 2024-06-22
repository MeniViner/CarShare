import React, { useState } from 'react';
import { Data } from '@react-google-maps/api';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/invitation.css';

const Invitation = ({ selectedCar }) => {
  const [isHourly, setIsHourly] = useState(true);
  const [selectedHours, setSelectedHours] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
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

  const handleDateChange = (field, value) => {
    const date = new Date(value);
    if (field === 'start') {
      setStartDate(date);
      const newEndDate = new Date(date);
      newEndDate.setDate(newEndDate.getDate() + selectedDays);
      setEndDate(newEndDate);
    } else {
      setEndDate(date);
      setSelectedDays(Math.ceil((date - startDate) / (24 * 60 * 60 * 1000)));
    }
  };

  const calculateCost = () => {
    if (isHourly) {
      return selectedHours * selectedCar.pricePerHour;
    } else {
      return selectedDays * selectedCar.pricePerDay;
    }
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

      {isHourly ? (
        <div className="hourly-rental">
          <label>שעות</label>
          <div className="input-group">
            <button onClick={decrementHours}><FaMinus /></button>
            <input 
              type="number" 
              min="1" 
              value={selectedHours} 
              onChange={(e) => setSelectedHours(Math.max(1, e.target.value))} 
              readOnly
            />
            <button onClick={incrementHours}><FaPlus /></button>
          </div>
        </div>
      ) : (
        <div className="daily-rental">
          <label>מתאריך</label>
          <input 
            type="date" 
            value={startDate.toISOString().substring(0, 10)}
            onChange={(e) => handleDateChange('start', e.target.value)}
          />
          <label>עד תאריך</label>
          <input 
            type="date" 
            value={endDate.toISOString().substring(0, 10)}
            onChange={(e) => handleDateChange('end', e.target.value)}
          />
          <div className="input-group">
            <button onClick={decrementDays}><FaMinus /></button>
            <input 
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
        <button>הצג את הזמנתך</button>
      </div>
    </div>
  );
};

export default Invitation;
