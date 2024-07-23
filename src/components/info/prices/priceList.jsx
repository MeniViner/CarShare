// import React from 'react';
// import '../../../styles/priceList.css';

// const PriceList = () => {
//   return (
//     <div className="price-list">
//       <div className="car-model">
//         <h3>ניסאן מיקרה</h3>
//         <img src="images/nissan-micra.jpg" alt="ניסאן מיקרה" />
//         <ul>
//           <li>שעת: 10 ₪ + 1.5 ₪ לכל ק"מ</li>
//           <li>יומי: 120 ₪ + 1 ₪ לכל ק"מ</li>
//           <li>אקסטרה 7: 80 ₪ + 7 ₪ לכל שעה ומעלה*</li>
//           <li>שבועי: 600 ₪ + 0.8 ₪ לכל ק"מ</li>
//           <li>חודשי: 2,200 ₪ + 0.8 ₪ לכל ק"מ</li>
//         </ul>
//       </div>
//       <div className="car-model">
//         <h3>פיג'ו 208</h3>
//         <img src="images/peugeot-208.jpg" alt="פיג'ו 208" />
//         <ul>
//           <li>שעת: 12 ₪ + 1.5 ₪ לכל ק"מ</li>
//           <li>יומי: 150 ₪ + 1 ₪ לכל ק"מ</li>
//           <li>אקסטרה 7: 100 ₪ + 7 ₪ לכל שעה ומעלה*</li>
//           <li>שבועי: 700 ₪ + 0.8 ₪ לכל ק"מ</li>
//           <li>חודשי: 2,500 ₪ + 0.8 ₪ לכל ק"מ</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PriceList;







import React from 'react';

import '../../../styles/priceList.css';



const PriceList = () => {
  return (
    <div className="price-list">
      <p className="update-info">המחירון נכון לזמן זה ומתעדכן מעת לעת</p>
      
      <div className="car-option">
        <h2>קטן E | 5 מקומות | ניסאן מיקרה</h2>
        <img src="path-to-nissan-micra.jpg" alt="Nissan Micra" />
        <ul>
          <li>שעתי | 10 ₪ לשעה + 1.5 ₪ לכל ק"מ</li>
          <li>יומי | 120 ₪ ליום + 1 ₪ לכל ק"מ</li>
          {/* <li>אקסטרה 7 | 80 ₪ 7 שעות ומעלה* + 1 ₪ לכל ק"מ</li>
          <li>שבועי | 600 ₪ לשבוע + 0.8 ₪ לכל ק"מ</li>
          <li>חודשי | 2,200 ₪ לחודש + 0.8 ₪ לכל ק"מ</li> */}
        </ul>
      </div>

      <div className="car-option">
        <h2>קטן G | 5 מקומות | פיגו 208</h2>
        <img src="path-to-peugeot-208.jpg" alt="Peugeot 208" />
        <ul>
          <li>שעתי | 12 ₪ לשעה + 1.5 ₪ לכל ק"מ</li>
          <li>יומי | 150 ₪ ליום + 1 ₪ לכל ק"מ</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceList;