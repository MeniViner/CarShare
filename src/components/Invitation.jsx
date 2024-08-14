// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import '../styles/invitation.css';

// const Invitation = ({ selectedCar, onCheckAvailability }) => {
//   const [isHourly, setIsHourly] = useState(true);
//   const [selectedHours, setSelectedHours] = useState(1);
//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date().toTimeString().slice(0, 5));
//   const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
//   const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000).toTimeString().slice(0, 5));
//   const [selectedDays, setSelectedDays] = useState(1);

//   const handleTabClick = (hourly) => {
//     setIsHourly(hourly);
//   };

//   const increment = (type) => {
//     if (type === 'hours') {
//       setSelectedHours(prev => prev + 1);
//       const newEndTime = new Date(startDate);
//       newEndTime.setHours(newEndTime.getHours() + selectedHours + 1);
//       setEndTime(newEndTime.toTimeString().slice(0, 5));
//     } else if (type === 'days') {
//       setSelectedDays(prev => prev + 1);
//       const newEndDate = new Date(startDate);
//       newEndDate.setDate(newEndDate.getDate() + selectedDays + 1);
//       setEndDate(newEndDate);
//     }
//   };
  
//   const decrement = (type) => {
//     if (type === 'hours') {
//       setSelectedHours(prev => (prev > 1 ? prev - 1 : 1));
//       const newEndTime = new Date(startDate);
//       newEndTime.setHours(newEndTime.getHours() + selectedHours - 1);
//       setEndTime(newEndTime.toTimeString().slice(0, 5));
//     } else if (type === 'days') {
//       setSelectedDays(prev => (prev > 1 ? prev - 1 : 1));
//       const newEndDate = new Date(startDate);
//       newEndDate.setDate(newEndDate.getDate() + selectedDays - 1);
//       setEndDate(newEndDate);
//     }
//   };

//   const handleDateChange = (field, value) => {
//     if (isNaN(Date.parse(value))) {
//       return; // טיפול בתאריך לא תקין
//     }

    
//     const date = new Date(value);
//     if (field === 'start') {
//       setStartDate(date);
//       if (date > endDate) {
//         setEndDate(date); // אם התאריך ההתחלתי גדול יותר, נעדכן גם את תאריך הסיום
//       }
//     } else {
//       if (date < startDate) {
//         setEndDate(startDate); // אם תאריך הסיום קטן מהתאריך ההתחלתי, נעדכן אותו לתאריך ההתחלתי
//       } else {
//         setEndDate(date);
//       }
//       setSelectedDays(Math.ceil((date - startDate) / (24 * 60 * 60 * 1000)));
//     }
//   };
  
//   const handleTimeChange = (field, value) => {
//     const [hours, minutes] = value.split(':').map(Number);
//     if (field === 'start') {
//       setStartTime(value);
//       if (new Date(`1970-01-01T${value}`) >= new Date(`1970-01-01T${endTime}`)) {
//         const newEndTime = `${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
//         setEndTime(newEndTime); // אם שעת ההתחלה גדולה משעת הסיום, נעדכן את שעת הסיום
//       }
//     } else {
//       if (new Date(`1970-01-01T${value}`) <= new Date(`1970-01-01T${startTime}`)) {
//         setEndTime(startTime); // אם שעת הסיום קטנה משעת ההתחלה, נעדכן את שעת הסיום לשעת ההתחלה
//       } else {
//         setEndTime(value);
//       }
//     }
//   };


//   const calculateCost = () => {
//     if (isHourly) {
//       return selectedHours * selectedCar.pricePerHour;
//     } else {
//       return selectedDays * selectedCar.pricePerDay;
//     }
//   };

//   // בדיקת זמינות
//   const handleCheckAvailability = () => {
//     const reservationData = {
//       startDate: startDate.toISOString().split('T')[0],
//       startTime,
//       endDate: endDate.toISOString().split('T')[0],
//       endTime,
//       selectedHours,
//       selectedDays,
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
//           לפי שעה
//         </button>
//         <button 
//           className={`tab ${!isHourly ? 'active' : ''}`} 
//           onClick={() => handleTabClick(false)}
//         >
//           לפי יום
//         </button>
//       </div>

//       <div className="date-time-selection">
//         <label>התחלה</label>
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
//                 value={startDate.toISOString().substring(0, 10)}
//                 onChange={(e) => handleDateChange('start', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <label>סיום</label>
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
//                 value={endDate.toISOString().substring(0, 10)}
//                 onChange={(e) => handleDateChange('end', e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="sum-rental-label">
//         <label>סה"כ שעות</label>
//         <label>סה"כ ימים</label>
//       </div>

//       <div className="rental-period">
//         <div className="period-group">
//           <div className="input-container">
//             <button onClick={() => decrement('hours')} className="change-button"><FaMinus /></button>
//             <input 
//               className="no-spinner rental-input"
//               type="number" 
//               readOnly
//               min="1" 
//               value={selectedHours} 
//               onChange={(e) => setSelectedHours(Math.max(1, e.target.value))} 
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
//               min="0" 
//               value={selectedDays} 
//               onChange={(e) => setSelectedDays(Math.max(0, e.target.value))} 
//             />
//             <button onClick={() => increment('days')} className="change-button"><FaPlus /></button>
//           </div>
//         </div>

//       </div>

//       <div className="cost-summary">
//         <p>₪סה"כ עלות: {calculateCost()} </p>
//         <button onClick={handleCheckAvailability}>בדוק זמינות</button>
//       </div>

//     </div>
//   );
// };

// export default Invitation;












// const increment = (type) => {
//   if (type === 'days') {
//     setSelectedDays(prev => prev + 1);
//     const newEndDate = new Date(startDate);
//     newEndDate.setDate(newEndDate.getDate() + selectedDays + 1);
//     setEndDate(newEndDate);
//   } else if (type === 'hours') {
//     setSelectedHours(prev => prev + 1);
//     const newEndTime = new Date(`1970-01-01T${startTime}`);
//     newEndTime.setHours(newEndTime.getHours() + selectedHours + 1);
//     setEndTime(newEndTime.toTimeString().slice(0, 5));
//   }
// };

// const decrement = (type) => {
//   if (type === 'days') {
//     setSelectedDays(prev => (prev > 0 ? prev - 1 : 0));
//     const newEndDate = new Date(startDate);
//     newEndDate.setDate(newEndDate.getDate() + selectedDays - 1);
//     setEndDate(newEndDate);
//   } else if (type === 'hours') {
//     setSelectedHours(prev => (prev > 1 ? prev - 1 : 1));
//     const newEndTime = new Date(`1970-01-01T${startTime}`);
//     newEndTime.setHours(newEndTime.getHours() + selectedHours - 1);
//     setEndTime(newEndTime.toTimeString().slice(0, 5));
//   }
// };

// const handleDateChange = (field, value) => {
//   const date = new Date(value);
//   if (field === 'start') {
  //     setStartDate(date);
  //     setEndDate(new Date(date.getTime() + selectedDays * 24 * 60 * 60 * 1000));
//   } else {
  //     setEndDate(date);
  //   }
// };

// const handleTimeChange = (field, value) => {
//   if (field === 'start') {
  //     setStartTime(value);
  //     setEndTime(new Date(`1970-01-01T${value}`).toTimeString().slice(0, 5));
  //   } else {
    //     setEndTime(value);
//   }
// };

// const formatDateToDDMMYY = (date) => {
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//   const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
//   return `${day}/${month}/${year}`;
// };

// const parseDDMMYYToDate = (ddmmyy) => {
//   const [day, month, year] = ddmmyy.split('/').map(Number);
//   return new Date(2000 + year, month - 1, day); // Assuming 2000+ year
// };





// import React, { useState, useEffect } from 'react';
// import { format, formatDate } from 'date-fns';
// import { FaPlus, FaMinus } from 'react-icons/fa';
// import '../styles/invitation.css';

// const Invitation = ({ selectedCar, onCheckAvailability }) => {

//   const calculateCost = () => {
//     const totalHours = selectedDays * 24 + selectedHours;
//     if (isHourly) {
//       return totalHours * selectedCar.pricePerHour;
//     } else {
//       return selectedDays * selectedCar.pricePerDay + selectedHours * selectedCar.pricePerHour;
//     }
//   };

//   const [isHourly, setIsHourly] = useState(true);
//   const [startDate, setStartDate] = useState(new Date());
//   const [startTime, setStartTime] = useState(new Date().toTimeString().slice(0, 5));
//   const [endDate, setEndDate] = useState(new Date());
//   // const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
//   const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000).toTimeString().slice(0, 5));
//   const [selectedDays, setSelectedDays] = useState(0);
//   const [selectedHours, setSelectedHours] = useState(0);
//   const [totalCost, setTotalCost] = useState(calculateCost());

//   const handleTabClick = (hourly) => {
//     setIsHourly(hourly);
//   };


  // const handleDateChange = (field, value) => {
  //   // const date = parseDDMMYYToDate(value);
  //   if (isNaN(Date.parse(value))) {
  //     return; // Handle invalid date
  //   }
  
  //   const date = new Date(value);
  //   if (field === 'start') {
  //     setStartDate(date);
  //     if (date > endDate) {
  //       setEndDate(date);
  //     }
  //   } else {
  //     if (date < startDate) {
  //       setEndDate(startDate); 
  //     } else {
  //       setEndDate(date);
  //     }
  //     setSelectedDays(Math.ceil((date - startDate) / (24 * 60 * 60 * 1000)));
  //   }
  //   setTotalCost(calculateCost()); 
  // };
  
  // const handleTimeChange = (field, value) => {
  //   const [hours, minutes] = value.split(':').map(Number);
  //   if (field === 'start') {
  //     setStartTime(value);
  //     if (new Date(`1970-01-01T${value}`) >= new Date(`1970-01-01T${endTime}`)) {
  //       const newEndTime = `${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  //       setEndTime(newEndTime); 
  //     }
  //   } else {
  //     if (new Date(`1970-01-01T${value}`) <= new Date(`1970-01-01T${startTime}`)) {
  //       setEndTime(startTime);
  //     } else {
  //       setEndTime(value);
  //     }
  //   }
  //   setTotalCost(calculateCost()); 
  // };


//   const increment = (type) => {
//   if (type === 'days') {
//     setSelectedDays(prev => prev + 1);
//     const newEndDate = new Date(startDate);
//     newEndDate.setDate(newEndDate.getDate() + selectedDays + 1);
//     setEndDate(newEndDate);
//   } else if (type === 'hours') {
//     setSelectedHours(prev => prev + 1);
//     const newEndTime = new Date(`1970-01-01T${startTime}`);
//     newEndTime.setHours(newEndTime.getHours() + selectedHours + 1);
//     setEndTime(newEndTime.toTimeString().slice(0, 5));
//   }
// };

// const decrement = (type) => {
//   if (type === 'days') {
//     setSelectedDays(prev => (prev > 0 ? prev - 1 : 0));
//     const newEndDate = new Date(startDate);
//     newEndDate.setDate(newEndDate.getDate() + selectedDays - 1);
//     setEndDate(newEndDate);
//   } else if (type === 'hours') {
//     setSelectedHours(prev => (prev > 1 ? prev - 1 : 1));
//     const newEndTime = new Date(`1970-01-01T${startTime}`);
//     newEndTime.setHours(newEndTime.getHours() + selectedHours - 1);
//     setEndTime(newEndTime.toTimeString().slice(0, 5));
//   }
// };
  
//   // const increment = (type) => {
//   //   if (type === 'hours') {
//   //     setSelectedHours(prev => {
//   //       const newHours = prev + 1;
//   //       setTotalCost(calculateCost()); 
//   //       return newHours;
//   //     });
//   //   } else if (type === 'days') {
//   //     setSelectedDays(prev => {
//   //       const newDays = prev + 1;
//   //       setTotalCost(calculateCost()); 
//   //       return newDays;
//   //     });
//   //   }
//   // };
  
//   // const decrement = (type) => {
//   //   if (type === 'hours') {
//   //     setSelectedHours(prev => {
//   //       const newHours = (prev > 0 ? prev - 1 : 1);
//   //       setTotalCost(calculateCost()); 
//   //       return newHours;
//   //     });
//   //   } else if (type === 'days') {
//   //     setSelectedDays(prev => {
//   //       const newDays = (prev > 0 ? prev - 1 : 1);
//   //       setTotalCost(calculateCost()); 
//   //       return newDays;
//   //     });
//   //   }
//   // };

//   const handleCheckAvailability = () => {
//     const reservationData = {
//       startDate: startDate.toISOString().split('T')[0],
//       startTime,
//       endDate: endDate.toISOString().split('T')[0],
//       endTime,
//       selectedHours,
//       selectedDays,
//       totalCost
//     };
//     onCheckAvailability(reservationData);
//   };

//   useEffect(() => {
//     setTotalCost(calculateCost());
//   }, [selectedHours, selectedDays, startDate, startTime, endDate, endTime, isHourly]);


import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { format, addHours, addDays, isBefore, isAfter, setHours, setMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/invitation.css';

// import DateTimePicker from '../utils/DateTimePicker'


const Invitation = ({ selectedCar, onCheckAvailability }) => {
  const calculateCost = (days, hours) => {
    const totalHours = days * 24 + hours;
    if (isHourly) {
      return totalHours * selectedCar.pricePerHour;
    } else {
      return days * selectedCar.pricePerDay + hours * selectedCar.pricePerHour;
    }
  };

  const [isHourly, setIsHourly] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(format(addHours(new Date(), 1), 'HH:mm'));
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedHours, setSelectedHours] = useState(1);
  const [totalCost, setTotalCost] = useState(calculateCost(0, 1));

  const handleTabClick = (hourly) => {
    setIsHourly(hourly);
  };

  // const handleDateChange = (field, value) => {
  //   const date = new Date(value);
  //   const now = new Date();
  //   now.setHours(0, 0, 0, 0);

  //   if (isBefore(date, now)) {
  //     return; // Prevent selecting past dates
  //   }

  //   if (field === 'start') {
  //     setStartDate(date);
  //     if (isBefore(endDate, date)) {
  //       setEndDate(date);
  //     }
  //   } else {
  //     if (isBefore(date, startDate)) {
  //       setEndDate(startDate);
  //     } else {
  //       setEndDate(date);
  //     }
  //   }
  //   updateSelectedDaysAndHours(field === 'start' ? date : startDate, field === 'end' ? date : endDate);
  // };

  // const handleTimeChange = (field, value) => {
  //   const [hours, minutes] = value.split(':').map(Number);
  //   let newDate = field === 'start' ? new Date(startDate) : new Date(endDate);
  //   newDate = setHours(setMinutes(newDate, minutes), hours);

  //   const now = new Date();

  //   if (field === 'start') {
  //     if (isBefore(newDate, now)) {
  //       return; // Prevent selecting past times
  //     }
  //     setStartTime(value);
  //     setStartDate(newDate);
  //     // if (isAfter(newDate, new Date(endDate.setHours(hours, minutes)))) {
  //     // if (isAfter(newDate, endDate)) {
  //     //   const newEndDate = addHours(newDate, 1);
  //     //   setEndTime(format(newEndDate, 'HH:mm'));
  //     //   setEndDate(newEndDate);
  //     // }
  //   } else {
  //     // if (isBefore(newDate, new Date(startDate))) {
  //     if (isBefore(newDate, startDate)) {
  //       return; // Prevent end time before start time
  //     }
  //     setEndTime(value);
  //     setEndDate(newDate);
  //   }
  //   // updateSelectedDaysAndHours(startDate, newDate);
  //   // updateSelectedDaysAndHours(startDate, field === 'start' ? newDate : endDate);
  //   updateSelectedDaysAndHours(field === 'start' ? newDate : startDate, field === 'end' ? newDate : endDate);
  // };

  const handleDateChange = (field, value) => {
    // const date = parseDDMMYYToDate(value);
    if (isNaN(Date.parse(value))) {
      return; // Handle invalid date
    }
  
    const date = new Date(value);
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
      setSelectedDays(Math.ceil((date - startDate) / (24 * 60 * 60 * 1000)));
    }
    // setTotalCost(calculateCost()); 
    updateSelectedDaysAndHours(field === 'start' ? date : startDate, field === 'end' ? date : endDate);

  };
  
  const handleTimeChange = (field, value) => {
    const [hours, minutes] = value.split(':').map(Number);
        // let newDate = field === 'start' ? new Date(startDate) : new Date(endDate);
        // newDate = setHours(setMinutes(newDate, minutes), hours);
        // const now = new Date();

    if (field === 'start') {
      setStartTime(value);
      if (new Date(`1970-01-01T${value}`) >= new Date(`1970-01-01T${endTime}`)) {
        const newEndTime = `${(hours + 1).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        setEndTime(newEndTime); 
      }
    } else {
      if (new Date(`1970-01-01T${value}`) <= new Date(`1970-01-01T${startTime}`)) {
        setEndTime(startTime);
      } else {
        setEndTime(value);
      }
    }
    setTotalCost(calculateCost()); 
    updateSelectedDaysAndHours(field === 'start' ? value : startTime, field === 'end' ? value : endTime);
        // updateSelectedDaysAndHours(startDate, field === 'start' ? newDate : endDate);

  };


  const updateSelectedDaysAndHours = (start, end) => {
    const days = differenceInDays(end, start);
    const hours = differenceInHours(end, start) % 24;
    setSelectedDays(days);
    setSelectedHours(hours);
    setTotalCost(calculateCost(days, hours));
  };

  const increment = (type) => {
    let newEndDate;
    if (type === 'days') {
      newEndDate = addDays(endDate, 1);
    } else if (type === 'hours') {
      newEndDate = addHours(endDate, 1);
    }
    setEndDate(newEndDate);
    setEndTime(format(newEndDate, 'HH:mm'));
    updateSelectedDaysAndHours(startDate, newEndDate);
  };

  const decrement = (type) => {
    let newEndDate;
    if (type === 'days' && selectedDays > 0) {
      newEndDate = addDays(endDate, -1);
    } else if (type === 'hours' && (selectedDays > 0 || selectedHours > 1)) {
      newEndDate = addHours(endDate, -1);
    } else {
      return; // Prevent decrementing below minimum
    }
    
    if (isAfter(newEndDate, startDate)) {
      setEndDate(newEndDate);
      setEndTime(format(newEndDate, 'HH:mm'));
      updateSelectedDaysAndHours(startDate, newEndDate);
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
      totalCost
    };
    onCheckAvailability(reservationData);
  };

  useEffect(() => {
    const options = { timeZone: 'Asia/Jerusalem' };
    const now = new Date(new Date().toLocaleString('he-IL', options));
    if (!isNaN(now)) {
      setStartDate(now);
      setStartTime(format(now, 'HH:mm'));
      const oneHourLater = addHours(now, 1);
      
      if (!isNaN(oneHourLater)) {
        setEndDate(oneHourLater);
        setEndTime(format(oneHourLater, 'HH:mm'));
        updateSelectedDaysAndHours(now, oneHourLater);
      }
    }
  }, []);



  return (
    <div className="invitation-container">
      <div className="tabs">
        <button 
          className={`tab ${isHourly ? 'active' : ''}`} 
          onClick={() => handleTabClick(true)}
        >
          <p>{t('hourly')}</p>
        </button>
        <button 
          className={`tab ${!isHourly ? 'active' : ''}`} 
          onClick={() => handleTabClick(false)}
        >
          <p>{t('daily')}</p>
        </button>
      </div>
      {/* <DateTimePicker/> */}
      <div className="date-time-selection">
        <label>{t('start')}</label>
        <div className="date-time-group">
          <div className="input-group">
            <div className="input-container">
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => handleTimeChange('start', e.target.value)}
              />
            </div>
            <div className="input-container">
              <input 
                type="date" 
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </div>
          </div>
        </div>
        <label>{t('end')}</label>
        <div className="date-time-group">
          <div className="input-group">
            <div className="input-container">
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => handleTimeChange('end', e.target.value)}
                />
            </div>
            <div className="input-container">
              <input 
                type="date" 
                value={format(endDate, 'yyyy-MM-dd')}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sum-rental-label">
        <label>{t('total hours')}</label>
        <label>{t('total days')}</label>
      </div>

      <div className="rental-period">
        <div className="period-group">
          <div className="input-container">
            <button onClick={() => decrement('hours')} className="change-button"><FaMinus /></button>
            <input 
              className="no-spinner rental-input"
              type="number" 
              readOnly
              value={selectedHours} 
            />
            <button onClick={() => increment('hours')} className="change-button"><FaPlus /></button>
          </div>
        </div>

        <div className="period-group">
          <div className="input-container">
            <button onClick={() => decrement('days')} className="change-button"><FaMinus /></button>
            <input 
              className="no-spinner rental-input"
              type="number" 
              readOnly
              value={selectedDays} 
            />
            <button onClick={() => increment('days')} className="change-button"><FaPlus /></button>
          </div>
        </div>
      </div>

      <div className="cost-summary">
        <button onClick={handleCheckAvailability}>{t('check availability')}</button>
        <p> ₪{totalCost} </p>
      </div>

    </div>
  );
};

export default Invitation;
