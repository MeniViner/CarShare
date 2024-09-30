import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import i18n from './utils/i18next';
import './utils/i18next';
import './styles/theme.css';

const applyStoredSettings = () => {
  const storedLanguage = localStorage.getItem('language') || 'he'; // ברירת מחדל לעברית אם אין שפה מוגדרת
  const storedTheme = localStorage.getItem('theme');

  i18n.changeLanguage(storedLanguage);
  document.documentElement.dir = storedLanguage === 'he' ? 'rtl' : 'ltr';

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
