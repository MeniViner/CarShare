// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import './utils/i18next'; //this is for the translate 
// import i18n from './utils/i18next'; // import i18n for language change detection

// document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
// i18n.on('languageChanged', (lng) => {
//   document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
// });

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './utils/i18next';
import i18n from './utils/i18next';
import './styles/theme.css';

// Function to apply stored settings
// const applyStoredSettings = () => {
//   const storedLanguage = localStorage.getItem('language');
//   const storedFontSize = localStorage.getItem('fontSize');
//   const storedTheme = localStorage.getItem('theme');

//   if (storedLanguage) {
//     i18n.changeLanguage(storedLanguage);
//     document.documentElement.dir = storedLanguage === 'he' ? 'rtl' : 'ltr';
//   }

//   if (storedFontSize) {
//     document.body.className = `font-size-${storedFontSize}`;
//   }

//   if (storedTheme) {
//     document.documentElement.setAttribute('data-theme', storedTheme);
//   } else {
//     // Default to light theme if no theme is stored
//     document.documentElement.setAttribute('data-theme', 'light');
//   }
// };

const applyStoredSettings = () => {
  const storedLanguage = localStorage.getItem('language') || 'he'; // ברירת מחדל לעברית אם אין שפה מוגדרת
  const storedFontSize = localStorage.getItem('fontSize');
  const storedTheme = localStorage.getItem('theme');

  i18n.changeLanguage(storedLanguage);
  document.documentElement.dir = storedLanguage === 'he' ? 'rtl' : 'ltr';

  if (storedFontSize) {
    document.body.className = `font-size-${storedFontSize}`;
  }

  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else {
    // Default to light theme if no theme is stored
    document.documentElement.setAttribute('data-theme', 'light');
  }
};


// Apply stored settings
applyStoredSettings();

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
});

ReactDOM.createRoot(document.getElementById('root')).render(<App />);