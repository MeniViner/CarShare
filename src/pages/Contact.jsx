import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from 'emailjs-com';

import { FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';
import { MdOutlineContactPage } from "react-icons/md";
import Notiflix from 'notiflix';
import '../styles/contact.css'; 


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
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          message: '' 
        });
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
