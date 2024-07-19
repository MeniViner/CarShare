// import React from 'react';
// import '../../../styles/additionalCharges.css';

// const AdditionalCharges = () => {
//   return (
//     <div className="additional-charges">
//       <div className="charge-item">
//         <h3>אי החזרת רכב לתחנה ממנה נלקח</h3>
//         <p>עד דקת הליכה: ללא חיוב</p>
//         <p>יותר מדקה הליכה ועד למרחק 500 מטר: 250 ₪</p>
//         <p>מעבר לכך: 250 ₪ + 3 ₪ לכל ק"מ*</p>
//       </div>
//       <div className="charge-item">
//         <h3>איחור בהחזרת רכב</h3>
//         <p>עד 10 דקות איחור: 1.5 ₪ לדקה</p>
//         <p>מעל 10 דקות איחור: 50 ₪ + 1.5 ₪ לכל דקת איחור</p>
//         <p>חובה לעדכן את המוקד הטלפוני על כל איחור!</p>
//       </div>
//       <div className="charge-item">
//         <h3>ביטול הזמנה</h3>
//         <p>עד שעתיים לפני מועד ההשכרה: ללא עלות</p>
//         <p>פחות משעתיים לפני מועד ההשכרה: 50% מסכום ההזמנה</p>
//         <p>החל מתחילת מועד ההשכרה: חיוב מלא על סכום ההזמנה</p>
//       </div>
//     </div>
//   );
// };

// export default AdditionalCharges;










import React from 'react';
import '../../../styles/additionalCharges.css';


const AdditionalCharges = () => {
  return (
    <div className="additional-charges">
      <div className="charge-item">
        <h3>אי החזרת רכב לתחנה ממנה נלקח</h3>
        <p>עד דקה הליכה: ללא חיוב</p>
        <p>יותר מדקה הליכה ועד למרחק 500 מטר: 250 ₪*</p>
        <p>מעבר לזה: 250 ₪ + 3 ₪ לק"מ *</p>
      </div>

      <div className="charge-item">
        <h3>איחור בהחזרת רכב</h3>
        <p>עד 10 דקות איחור: 1.5 ₪ לדקה</p>
        <p>מעל 10 דקות איחור: 50 ₪ + 1.5 ₪ לכל דקת איחור</p>
        <p>חובה לעדכן את המוקד הטלפוני על כל איחור! בלי קשר לתשלום</p>
      </div>

      <div className="charge-item">
        <h3>ביטול הזמנה</h3>
        <p>עד שעתיים לפני מועד ההשכרה: ללא עלות</p>
        <p>פחות משעתיים לפני מועד ההשכרה: חיוב מלא</p>
        <p>50% מסכום ההזמנה יחול מתחילת מועד ההשכרה: חיוב מלא על סכום ההזמנה</p>
      </div>
    </div>
  );
};

export default AdditionalCharges;