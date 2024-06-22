import React, { useState } from 'react';
import { DatePicker, TimePicker } from 'react-rainbow-components'; // השתמש ברכיבי בחירה של תאריך ושעה
import Swal from 'sweetalert2';
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

  const handleHoursChange = (e) => {
    const hours = Math.max(1, e.target.value);
    setSelectedHours(hours);
  };

  const handleDateChange = (field, date) => {
    if (field === 'start') {
      setStartDate(date);
      setEndDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
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
          <input 
            type="number" 
            min="1" 
            value={selectedHours} 
            onChange={handleHoursChange} 
          />
        </div>
      ) : (
        <div className="daily-rental">
          <label>מתאריך</label>
          <DatePicker
            value={startDate}
            onChange={(date) => handleDateChange('start', date)}
            formatStyle="medium"
          />
          <label>עד תאריך</label>
          <DatePicker
            value={endDate}
            onChange={(date) => handleDateChange('end', date)}
            formatStyle="medium"
          />
        </div>
      )}

      <div className="cost-summary">
        <p>סה"כ עלות: {calculateCost()} ₪</p>
        <button onClick={() => Swal.fire('הזמנה', 'הזמנתך נשלחה בהצלחה!', 'success')}>הצג את הזמנתך</button>
      </div>
    </div>
  );
};

export default Invitation;
