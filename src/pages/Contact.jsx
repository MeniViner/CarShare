import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaEnvelope, FaUser, FaPhone } from 'react-icons/fa';
import { MdOutlineContactPage } from "react-icons/md";
import Notiflix from 'notiflix';
import '../styles/contact.css'; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    // emailjs.sendForm('service_pwrn9gt', 'template_clbz548', e.target, 'cXxwK0yxh8Bphi8Di')
    e.preventDefault();
    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID, 
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      e.target, 
      process.env.REACT_APP_EMAILJS_USER_ID
    )
      .then((result) => {
          console.log(result.text);
          Notiflix.Notify.success(`Message sent successfully!\n{with status <${result.text}>}`);
      }, (error) => {
          console.log(error.text);
          Notiflix.Notify.failure(`Failed to send message.\nError: <${error.text}>`);
      });
    e.target.reset();
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <MdOutlineContactPage className="contact-icon" />
        <h1>Contact Us</h1>
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <FaUser className="input-icon" />
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            required 
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input 
            type="text" 
            name="phone" 
            placeholder="Your Phone Number" 
            required 
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows="5" 
            required 
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
