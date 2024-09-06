
// import React, { useState, useEffect } from 'react';
// import { t } from 'i18next';
// import { format, addHours, addDays, isBefore, isAfter, setHours, setMinutes, differenceInHours, differenceInDays } from 'date-fns';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import '../styles/invitation.css';

// const Invitation = ({ selectedCar, onCheckAvailability }) => {
//   const calculateCost = (days, hours) => {
//     const totalHours = days * 24 + hours;
//     if (isHourly) {
//       return totalHours * selectedCar.pricePerHour;
//     } else {
//       return days * selectedCar.pricePerDay + hours * selectedCar.pricePerHour;
//     }
//   };

//   const [isHourly, setIsHourly] = useState(true);
//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
//   const [endDate, setEndDate] = useState(new Date());
//   const [endTime, setEndTime] = useState(format(addHours(new Date(), 1), 'HH:mm'));
//   const [selectedDays, setSelectedDays] = useState(0);
//   const [selectedHours, setSelectedHours] = useState(1);
//   const [totalCost, setTotalCost] = useState(calculateCost(0, 1));

//   const handleTabClick = (hourly) => {
//     setIsHourly(hourly);
//   };

//   const handleDateChange = (field, value) => {
//     // const date = parseDDMMYYToDate(value);
//     if (isNaN(Date.parse(value))) {
//       return; // Handle invalid date
//     }
  
//     const date = new Date(value);
//     if (field === 'start') {
//       setStartDate(date);
//       if (date > endDate) {
//         setEndDate(date);
//       }
//     } else {
//       if (date < startDate) {
//         setEndDate(startDate); 
//       } else {
//         setEndDate(date);
//       }
//       setSelectedDays(Math.ceil((date - startDate) / (24 * 60 * 60 * 1000)));
//     }
//     updateSelectedDaysAndHours(field === 'start' ? date : startDate, field === 'end' ? date : endDate);

//   };
  
//   const handleTimeChange = (field, value) => {
//     const [hours, minutes] = value.split(':').map(Number);

//     if (field === 'start') {
//       setStartTime(value);
//       if (new Date(`1970-01-01T${value}`) >= new Date(`1970-01-01T${endTime}`)) {
//         const newEndTime = `${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//         setEndTime(newEndTime); 
//       }
//     } else {
//       if (new Date(`1970-01-01T${value}`) <= new Date(`1970-01-01T${startTime}`)) {
//         setEndTime(startTime);
//       } else {
//         setEndTime(value);
//       }
//     }
//     setTotalCost(calculateCost()); 
//     updateSelectedDaysAndHours(field === 'start' ? value : startTime, field === 'end' ? value : endTime);

//   };


//   const updateSelectedDaysAndHours = (start, end) => {
//     const days = differenceInDays(end, start);
//     const hours = differenceInHours(end, start) % 24;
//     setSelectedDays(days);
//     setSelectedHours(hours);
//     setTotalCost(calculateCost(days, hours));
//   };

//   const increment = (type) => {
//     let newEndDate;
//     if (type === 'days') {
//       newEndDate = addDays(endDate, 1);
//     } else if (type === 'hours') {
//       newEndDate = addHours(endDate, 1);
//     }
//     setEndDate(newEndDate);
//     setEndTime(format(newEndDate, 'HH:mm'));
//     updateSelectedDaysAndHours(startDate, newEndDate);
//   };

//   const decrement = (type) => {
//     let newEndDate;
//     if (type === 'days' && selectedDays > 0) {
//       newEndDate = addDays(endDate, -1);
//     } else if (type === 'hours' && (selectedDays > 0 || selectedHours > 1)) {
//       newEndDate = addHours(endDate, -1);
//     } else {
//       return; 
//     }
    
//     if (isAfter(newEndDate, startDate)) {
//       setEndDate(newEndDate);
//       setEndTime(format(newEndDate, 'HH:mm'));
//       updateSelectedDaysAndHours(startDate, newEndDate);
//     }
//   };

//   const handleCheckAvailability = () => {
//     const reservationData = {
//       startDate: format(startDate, 'yyyy-MM-dd'),
//       startTime,
//       endDate: format(endDate, 'yyyy-MM-dd'),
//       endTime,
//       selectedHours,
//       selectedDays,
//       totalCost
//     };
//     onCheckAvailability(reservationData);
//   };

//   useEffect(() => {
//     const options = { timeZone: 'Asia/Jerusalem' };
//     const now = new Date(new Date().toLocaleString('he-IL', options));
//     if (!isNaN(now)) {
//       setStartDate(now);
//       setStartTime(format(now, 'HH:mm'));
//       const oneHourLater = addHours(now, 1);
      
//       if (!isNaN(oneHourLater)) {
//         setEndDate(oneHourLater);
//         setEndTime(format(oneHourLater, 'HH:mm'));
//         updateSelectedDaysAndHours(now, oneHourLater);
//       }
//     }
//   }, []);



//   return (
//     <div className="invitation-container">
//       <div className="tabs">
//         <button 
//           className={`tab ${isHourly ? 'active' : ''}`} 
//           onClick={() => handleTabClick(true)}
//         >
//           <p>{t('hourly')}</p>
//         </button>
//         <button 
//           className={`tab ${!isHourly ? 'active' : ''}`} 
//           onClick={() => handleTabClick(false)}
//         >
//           <p>{t('daily')}</p>
//         </button>
//       </div>
//       {/* <DateTimePicker/> */}
//       <div className="date-time-selection">
//         <label>{t('start')}</label>
//         <div className="date-time-group">
//           <div className="input-group">
//             <div className="input-container">
//               <input 
//                 type="time" 
//                 value={startTime}
//                 onChange={(e) => handleTimeChange('start', e.target.value)}
//               />
//             </div>
//             <div className="input-container">
//               <input 
//                 type="date" 
//                 value={format(startDate, 'yyyy-MM-dd')}
//                 onChange={(e) => handleDateChange('start', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <label>{t('end')}</label>
//         <div className="date-time-group">
//           <div className="input-group">
//             <div className="input-container">
//               <input 
//                 type="time" 
//                 value={endTime}
//                 onChange={(e) => handleTimeChange('end', e.target.value)}
//                 />
//             </div>
//             <div className="input-container">
//               <input 
//                 type="date" 
//                 value={format(endDate, 'yyyy-MM-dd')}
//                 onChange={(e) => handleDateChange('end', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="sum-rental-label">
//         <label>{t('total hours')}</label>
//         <label>{t('total days')}</label>
//       </div>

//       <div className="rental-period">
//         <div className="period-group">
//           <div className="input-container">
//             <button onClick={() => decrement('hours')} className="change-button"><FaMinus /></button>
//             <input 
//               className="no-spinner rental-input"
//               type="number" 
//               readOnly
//               value={selectedHours} 
//             />
//             <button onClick={() => increment('hours')} className="change-button"><FaPlus /></button>
//           </div>
//         </div>

//         <div className="period-group">
//           <div className="input-container">
//             <button onClick={() => decrement('days')} className="change-button"><FaMinus /></button>
//             <input 
//               className="no-spinner rental-input"
//               type="number" 
//               readOnly
//               value={selectedDays} 
//             />
//             <button onClick={() => increment('days')} className="change-button"><FaPlus /></button>
//           </div>
//         </div>
//       </div>

//       <div className="cost-summary">
//         <button onClick={handleCheckAvailability}>{t('check availability')}</button>
//         <p> ₪{totalCost} </p>
//       </div>

//     </div>
//   );
// };

// export default Invitation;




// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { format, addHours, addDays, differenceInHours, differenceInDays } from 'date-fns';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import '../styles/invitation.css';

// const Invitation = ({ selectedCar, onCheckAvailability }) => {
//   const { t } = useTranslation();
//   const [isHourly, setIsHourly] = useState(true);
//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
//   const [endDate, setEndDate] = useState(new Date());
//   const [endTime, setEndTime] = useState(format(addHours(new Date(), 1), 'HH:mm'));
//   const [selectedDays, setSelectedDays] = useState(0);
//   const [selectedHours, setSelectedHours] = useState(1);
//   const [totalCost, setTotalCost] = useState(0);

//   const calculateCost = (start, end) => {
//     const hoursDiff = differenceInHours(end, start);
//     const daysDiff = differenceInDays(end, start);

//     let cost = 0;
//     if (isHourly) {
//       cost = hoursDiff * selectedCar.pricePerHour;
//     } else {
//       cost = daysDiff * selectedCar.pricePerDay;
//       const remainingHours = hoursDiff % 24;
//       cost += remainingHours * selectedCar.pricePerHour;
//     }

//     return Math.max(cost + selectedCar.unlockFee, 0);
//   };

//   useEffect(() => {
//     const start = new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
//     const end = new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);
//     const cost = calculateCost(start, end);
//     setTotalCost(cost);
//   }, [startDate, startTime, endDate, endTime, isHourly]);

//   const handleTabClick = (hourly) => {
//     setIsHourly(hourly);
//   };

//   const handleDateChange = (field, value) => {
//     const date = new Date(value);
//     if (isNaN(date.getTime())) return;

//     if (field === 'start') {
//       setStartDate(date);
//       if (date > endDate) {
//         setEndDate(date);
//       }
//     } else {
//       if (date < startDate) {
//         setEndDate(startDate);
//       } else {
//         setEndDate(date);
//       }
//     }
//     updateSelectedDaysAndHours();
//   };

//   const handleTimeChange = (field, value) => {
//     const [hours, minutes] = value.split(':').map(Number);
//     const date = field === 'start' ? startDate : endDate;
//     const newDate = new Date(date);
//     newDate.setHours(hours, minutes);

//     if (field === 'start') {
//       setStartTime(value);
//       if (newDate >= new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`)) {
//         setEndTime(format(addHours(newDate, 1), 'HH:mm'));
//       }
//     } else {
//       if (newDate <= new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`)) {
//         setEndTime(startTime);
//       } else {
//         setEndTime(value);
//       }
//     }
//     updateSelectedDaysAndHours();
//   };

//   const updateSelectedDaysAndHours = () => {
//     const start = new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
//     const end = new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);
//     const days = differenceInDays(end, start);
//     const hours = differenceInHours(end, start) % 24;
//     setSelectedDays(days);
//     setSelectedHours(hours);
//   };

//   const increment = (type) => {
//     let newEndDate = new Date(endDate);
//     if (type === 'days') {
//       newEndDate = addDays(newEndDate, 1);
//     } else if (type === 'hours') {
//       newEndDate = addHours(newEndDate, 1);
//     }
//     setEndDate(newEndDate);
//     setEndTime(format(newEndDate, 'HH:mm'));
//     updateSelectedDaysAndHours();
//   };

//   const decrement = (type) => {
//     let newEndDate = new Date(endDate);
//     if (type === 'days' && selectedDays > 0) {
//       newEndDate = addDays(newEndDate, -1);
//     } else if (type === 'hours' && (selectedDays > 0 || selectedHours > 1)) {
//       newEndDate = addHours(newEndDate, -1);
//     } else {
//       return;
//     }
    
//     if (newEndDate > startDate) {
//       setEndDate(newEndDate);
//       setEndTime(format(newEndDate, 'HH:mm'));
//       updateSelectedDaysAndHours();
//     }
//   };

//   const handleCheckAvailability = () => {
//     const reservationData = {
//       startDate: format(startDate, 'yyyy-MM-dd'),
//       startTime,
//       endDate: format(endDate, 'yyyy-MM-dd'),
//       endTime,
//       selectedHours,
//       selectedDays,
//       totalCost,
//       isHourly
//     };
//     onCheckAvailability(reservationData);
//   };

//   return (
//     <div className="invitation-container">
//       <div className="tabs">
//         <button 
//           className={`tab ${isHourly ? 'active' : ''}`} 
//           onClick={() => handleTabClick(true)}
//         >
//           <p>{t('hourly')}</p>
//         </button>
//         <button 
//           className={`tab ${!isHourly ? 'active' : ''}`} 
//           onClick={() => handleTabClick(false)}
//         >
//           <p>{t('daily')}</p>
//         </button>
//       </div>
//       <div className="date-time-selection">
//         <label>{t('start')}</label>
//         <div className="date-time-group">
//           <div className="input-group">
//             <div className="input-container">
//               <input 
//                 type="time" 
//                 value={startTime}
//                 onChange={(e) => handleTimeChange('start', e.target.value)}
//               />
//             </div>
//             <div className="input-container">
//               <input 
//                 type="date" 
//                 value={format(startDate, 'yyyy-MM-dd')}
//                 onChange={(e) => handleDateChange('start', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <label>{t('end')}</label>
//         <div className="date-time-group">
//           <div className="input-group">
//             <div className="input-container">
//               <input 
//                 type="time" 
//                 value={endTime}
//                 onChange={(e) => handleTimeChange('end', e.target.value)}
//               />
//             </div>
//             <div className="input-container">
//               <input 
//                 type="date" 
//                 value={format(endDate, 'yyyy-MM-dd')}
//                 onChange={(e) => handleDateChange('end', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="sum-rental-label">
//         <label>{t('total hours')}</label>
//         <label>{t('total days')}</label>
//       </div>

//       <div className="rental-period">
//         <div className="period-group">
//           <div className="input-container">
//             <button onClick={() => decrement('hours')} className="change-button"><FaMinus /></button>
//             <input 
//               className="no-spinner rental-input"
//               type="number" 
//               readOnly
//               value={selectedHours} 
//             />
//             <button onClick={() => increment('hours')} className="change-button"><FaPlus /></button>
//           </div>
//         </div>

//         <div className="period-group">
//           <div className="input-container">
//             <button onClick={() => decrement('days')} className="change-button"><FaMinus /></button>
//             <input 
//               className="no-spinner rental-input"
//               type="number" 
//               readOnly
//               value={selectedDays} 
//             />
//             <button onClick={() => increment('days')} className="change-button"><FaPlus /></button>
//           </div>
//         </div>
//       </div>

//       <div className="cost-summary">
//         <button onClick={handleCheckAvailability}>{t('check availability')}</button>
//         <p>₪{totalCost.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default Invitation;















import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format, addHours, addDays, differenceInHours, differenceInDays } from 'date-fns';
import { FaPlus, FaMinus } from 'react-icons/fa';
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


  const calculateCost = (start, end) => {
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
  };

  useEffect(() => {
    const start = new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
    const end = new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);
    const cost = calculateCost(start, end);
    setTotalCost(cost);
  }, [startDate, startTime, endDate, endTime, isHourly]);

  const handleTabClick = (hourly) => {
    setIsHourly(hourly);
  };

  const handleDateChange = (field, value) => {
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
    updateSelectedDaysAndHours();
  };

  const handleTimeChange = (field, value) => {
    const [hours, minutes] = value.split(':').map(Number);
    const date = field === 'start' ? startDate : endDate;
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);

    if (field === 'start') {
      setStartTime(value);
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
    updateSelectedDaysAndHours();
  };

  const updateSelectedDaysAndHours = () => {
    const start = new Date(`${format(startDate, 'yyyy-MM-dd')}T${startTime}`);
    const end = new Date(`${format(endDate, 'yyyy-MM-dd')}T${endTime}`);
    const days = differenceInDays(end, start);
    const hours = differenceInHours(end, start) % 24;
    setSelectedDays(days);
    setSelectedHours(hours);
  };

  const increment = (type) => {
    let newEndDate = new Date(endDate);
    if (type === 'days') {
      newEndDate = addDays(newEndDate, 1);
    } else if (type === 'hours') {
      newEndDate = addHours(newEndDate, 1);
    }
    setEndDate(newEndDate);
    setEndTime(format(newEndDate, 'HH:mm'));
    updateSelectedDaysAndHours();
  };

  const decrement = (type) => {
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
      updateSelectedDaysAndHours();
    }
  };

  const handleCheckAvailability = () => {
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
  };

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

      <div className="duration-selection">
        <div className="duration-group">
          <label>{t('total hours')}</label>
          <div className="counter">
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
          <div className="counter">
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

      <div className="summary">
        <button onClick={handleCheckAvailability} className="check-availability-btn">
          {t('check availability')}
        </button>
        <div className="total-cost">₪{totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Invitation;