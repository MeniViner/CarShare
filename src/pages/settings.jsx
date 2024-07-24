import React, { useState, useEffect } from 'react';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import ThemeToggle from '../assets/themeToggle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import '../styles/settings.css'

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../data/firebaseConfig';



const Settings = () => {

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en'); 


  const saveUserSettings = async (settings) => {
    try {
      await addDoc(collection(db, 'settings'), {
        userId: auth.currentUser.uid,
        ...settings,
      });
      // console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getUserSettings = async () => {
    try {
      const q = query(collection(db, 'settings'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userSettings = querySnapshot.docs[0].data();
        return userSettings.language || 'en';
      }
    } catch (e) {
      console.error('Error getting document: ', e);
    }
    return 'en';
  };


  useEffect(() => {
    const fetchSettings = async () => {
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
        i18n.changeLanguage(storedLanguage);
        document.documentElement.dir = storedLanguage === 'he' ? 'rtl' : 'ltr';
      } else {
        const userLanguage = await getUserSettings();
        setLanguage(userLanguage);
        i18n.changeLanguage(userLanguage);
        document.documentElement.dir = userLanguage === 'he' ? 'rtl' : 'ltr';
      }
    };
    fetchSettings();
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [i18n, isDarkMode]);


  const handleLanguageChange = (lang) => {
    if (!auth.currentUser) {
      console.info(t('info-lang'))
    }

    setLanguage(lang);
    localStorage.setItem('language', lang);
    saveUserSettings({ language: lang });
    i18n.changeLanguage(lang).then(() => {
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
      if (auth.currentUser) {
        console.info(t('lang-saved'))
      }
    });
  };


  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    // document.body.classList.toggle('dark-mode', !isDarkMode);
    // document.body.classList.toggle('light-mode', isDarkMode);
  };

  return (
    <div className="settings-container">
      <h2>{t('settings')}</h2>

      <div className="language-settings">
        <p>{t('set-language')}</p>
        <div className="language-buttons">
          <button
            className={`language-button ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={`language-button ${language === 'he' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('he')}
          >
            עברית
          </button>
        </div>
      </div>

      <div className="theme-settings">
        <p>{t('map-color')}</p>
        <div className={`theme-toggle-container ${language === 'he' ? 'rtl' : ''}`}>
          <ThemeToggle toggleTheme={toggleTheme} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default withOfflineOverlay(Settings);
