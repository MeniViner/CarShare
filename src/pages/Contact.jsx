// import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
// import { FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';
// import { MdOutlineContactPage } from "react-icons/md";
// import Notiflix from 'notiflix';
// import '../styles/contact.css'; 

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     // emailjs.sendForm('service_pwrn9gt', 'template_clbz548', e.target, 'cXxwK0yxh8Bphi8Di')
//     e.preventDefault();
//     emailjs.sendForm(
//       process.env.REACT_APP_EMAILJS_SERVICE_ID, 
//       process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
//       e.target, 
//       process.env.REACT_APP_EMAILJS_USER_ID
//     )
//       .then((result) => {
//           console.log(result.text);
//           Notiflix.Notify.success(`Message sent successfully!\n{with status <${result.text}>}`);
//       }, (error) => {
//           console.log(error.text);
//           Notiflix.Notify.failure(`Failed to send message.\nError: <${error.text}>`);
//       });
//     e.target.reset();
//   };

//   return (
//     <div className="contact-container">
//         <div className="contact-header">
//             <MdOutlineContactPage className="contact-icon" />
//             <h1>Contact Us</h1>
//         </div>
//         <form onSubmit={handleSubmit} className="contact-form">
//             <div className="input-group">
//                 <FaUser className="input-icon" />
//                 <input 
//                     type="text" 
//                     name="name" 
//                     placeholder="Your Name" 
//                     required 
//                     onChange={handleChange}
//                 />
//                 </div>
//                 <div className="input-group">
//                 <FaEnvelope className="input-icon" />
//                 <input 
//                     type="email" 
//                     name="email" 
//                     placeholder="Your Email" 
//                     required 
//                     onChange={handleChange}
//                 />
//                 </div>
//                 <div className="input-group">
//                 <FaPhone className="input-icon" />
//                 <input 
//                     type="text" 
//                     name="phone" 
//                     placeholder="Your Phone Number" 
//                     required 
//                     onChange={handleChange}
//                 />
//                 </div>
//                 <div className="input-group">
//                 <textarea 
//                     name="message" 
//                     placeholder="Your Message" 
//                     rows="5" 
//                     required 
//                     onChange={handleChange}
//                 ></textarea>
//             </div>
//             <button type="submit" className="submit-button">Send Message</button>
//         </form>
//     </div>
//   );
// };

// export default ContactForm;







import React, { useState, useCallback } from 'react';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';
import { MdOutlineContactPage } from "react-icons/md";
import Notiflix from 'notiflix';
import '../styles/contact.css'; 
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID, 
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      e.target, 
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((result) => {
        console.log(result.text);
        Notiflix.Notify.success(t('message sent success', { status: result.text }));
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, (error) => {
        console.log(error.text);
        Notiflix.Notify.failure(t('message sent failure', { error: error.text }));
      });
  }, [t]);

  return (
    <div className="contact-container">
      <div className="contact-header">
        <MdOutlineContactPage className="contact-icon" />
        <h1>{t('contact us')}</h1>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        {[
          { name: 'name', icon: FaUser, placeholder: t('your name') },
          { name: 'email', icon: FaEnvelope, placeholder: t('your email'), type: 'email' },
          { name: 'phone', icon: FaPhone, placeholder: t('your phone') },
        ].map(({ name, icon: Icon, placeholder, type = 'text' }) => (
          <div className="input-group" key={name}>
            <Icon className="input-icon" />
            <input 
              type={type}
              name={name}
              placeholder={placeholder}
              required 
              onChange={handleChange}
              value={formData[name]}
            />
          </div>
        ))}
        <div className="input-group">
          <textarea 
            name="message" 
            placeholder={t('your message')}
            rows="5" 
            required 
            onChange={handleChange}
            value={formData.message}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">{t('send message')}</button>
      </form>
    </div>
  );
};

export default React.memo(ContactForm);



// **שימוש ב-`useTranslation`**: הוספנו תמיכה בתרגום עבור כל הטקסטים בקומפוננטה.
// **אופטימיזציה של פונקציות**: השתמשנו ב-`useCallback` עבור `handleChange` ו-`handleSubmit` כדי למנוע יצירה מחדש של פונקציות בכל רינדור.
// **שיפור בטיפול בטופס**: במקום לאפס את הטופס באמצעות `e.target.reset()`, אנו מאפסים את ה-`formData` ישירות, מה שמבטיח שהמצב של React מסונכרן עם הטופס.
// **קוד נקי יותר**: השתמשנו במערך ובמיפוי כדי לרנדר את שדות הקלט, מה שהופך את הקוד לקריא יותר ופחות חזרתי.
// **שימוש ב-`React.memo`**: עטפנו את הקומפוננטה ב-`React.memo` כדי למנוע רינדורים מיותרים כאשר ה-props לא משתנים.
// **ערכים מבוקרים**: הוספנו את התכונה `value` לכל שדות הקלט, כולל ה-`textarea`, כדי להפוך אותם לרכיבים מבוקרים במלואם.
// **שיפור בהודעות המשתמש**: השתמשנו במחרוזות מתורגמות עבור הודעות ההצלחה והכישלון של שליחת הטופס.