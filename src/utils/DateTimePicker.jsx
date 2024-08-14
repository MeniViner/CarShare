// import React, { useState, useEffect } from 'react';
// import './DateTimePicker.css';

// const DateTimePicker = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const togglePicker = () => setIsOpen(!isOpen);

//   const generateOptions = (start, end) => {
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   const days = generateOptions(1, 31);
//   const months = [
//     'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
//     'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
//   ];
//   const years = generateOptions(2020, 2030);
//   const hours = generateOptions(0, 23);
//   const minutes = generateOptions(0, 59);

//   const handleWheelScroll = (e, type) => {
//     e.preventDefault();
//     const newDate = new Date(selectedDate);
//     const delta = e.deltaY > 0 ? 1 : -1;

//     switch (type) {
//       case 'day':
//         newDate.setDate(newDate.getDate() + delta);
//         break;
//       case 'month':
//         newDate.setMonth(newDate.getMonth() + delta);
//         break;
//       case 'year':
//         newDate.setFullYear(newDate.getFullYear() + delta);
//         break;
//       case 'hour':
//         newDate.setHours(newDate.getHours() + delta);
//         break;
//       case 'minute':
//         newDate.setMinutes(newDate.getMinutes() + delta);
//         break;
//     }

//     setSelectedDate(newDate);
//   };

//   const formatDateTime = (date) => {
//     return date.toLocaleString('he-IL', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: false
//     });
//   };

//   useEffect(() => {
//     console.log("Selected DateTime updated:", selectedDate);
//   }, [selectedDate]);

//   return (
//     <div className="date-time-picker">
//       <div className="picker-value" onClick={togglePicker}>
//         {formatDateTime(selectedDate)}
//       </div>
//       {isOpen && (
//         <div className="picker-modal">
//           <div className="picker-wheels">
//             <div className="wheel" onWheel={(e) => handleWheelScroll(e, 'day')}>
//               {days.map(day => (
//                 <div key={day} className={`wheel-item ${day === selectedDate.getDate() ? 'selected' : ''}`}>
//                   {day}
//                 </div>
//               ))}
//             </div>
//             <div className="wheel" onWheel={(e) => handleWheelScroll(e, 'month')}>
//               {months.map((month, index) => (
//                 <div key={month} className={`wheel-item ${index === selectedDate.getMonth() ? 'selected' : ''}`}>
//                   {month}
//                 </div>
//               ))}
//             </div>
//             <div className="wheel" onWheel={(e) => handleWheelScroll(e, 'year')}>
//               {years.map(year => (
//                 <div key={year} className={`wheel-item ${year === selectedDate.getFullYear() ? 'selected' : ''}`}>
//                   {year}
//                 </div>
//               ))}
//             </div>
//             <div className="wheel" onWheel={(e) => handleWheelScroll(e, 'hour')}>
//               {hours.map(hour => (
//                 <div key={hour} className={`wheel-item ${hour === selectedDate.getHours() ? 'selected' : ''}`}>
//                   {hour.toString().padStart(2, '0')}
//                 </div>
//               ))}
//             </div>
//             <div className="wheel" onWheel={(e) => handleWheelScroll(e, 'minute')}>
//               {minutes.map(minute => (
//                 <div key={minute} className={`wheel-item ${minute === selectedDate.getMinutes() ? 'selected' : ''}`}>
//                   {minute.toString().padStart(2, '0')}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="picker-actions">
//             <button onClick={togglePicker} className="select-btn">בחר</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateTimePicker;