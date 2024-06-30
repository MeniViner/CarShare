import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './utils/i18next'; //this is for the translate 
import i18n from './utils/i18next'; // import i18n for language change detection

document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
});

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
<<<<<<< HEAD
=======

// document.documentElement.dir = "rtl";
>>>>>>> c39b0f32c33d0522b2ac3ae763856c96391b50c0
