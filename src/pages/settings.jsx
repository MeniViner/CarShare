import React, { useState, useEffect, useCallback } from 'react';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import ThemeToggle from '../assets/themeToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import '../styles/settings.css'

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../data/firebaseConfig';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({
    isDarkMode: false,
    language: 'en',
    notificationsEnabled: false,
    vibrationEnabled: true,
    fontSize: 'medium'
  });

  const saveUserSettings = useCallback(async (newSettings) => {
    if (!auth.currentUser) {
      toast.error(t('please-login'));
      return;
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { settings: newSettings });
      toast.success(t('settings-saved'), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      console.error('Error updating document: ', e);
      toast.error(t('error-saving-settings'));
    }
  }, [t]);

  const getUserSettings = useCallback(async () => {
    if (!auth.currentUser) {
      return settings;
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.settings || settings;
      }
    } catch (e) {
      console.error('Error getting document: ', e);
    }
    return settings;
  }, [settings]);

  useEffect(() => {
    const fetchSettings = async () => {
      const storedSettings = await getUserSettings();
      setSettings(storedSettings);
      i18n.changeLanguage(storedSettings.language);
      document.documentElement.dir = storedSettings.language === 'he' ? 'rtl' : 'ltr';
      document.body.className = `font-size-${storedSettings.fontSize}`;
      document.documentElement.setAttribute('data-theme', storedSettings.isDarkMode ? 'dark' : 'light');
    };
    fetchSettings();
  }, [getUserSettings, i18n]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      saveUserSettings(newSettings);
      return newSettings;
    });
  }, [saveUserSettings]);

  const handleLanguageChange = useCallback((lang) => {
    updateSetting('language', lang);
    i18n.changeLanguage(lang).then(() => {
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    });
  }, [i18n, updateSetting]);

  const toggleTheme = useCallback(() => {
    updateSetting('isDarkMode', !settings.isDarkMode);
    document.documentElement.setAttribute('data-theme', !settings.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', !settings.isDarkMode ? 'dark' : 'light');
  }, [settings.isDarkMode, updateSetting]);

  const handleFontSizeChange = useCallback((size) => {
    updateSetting('fontSize', size);
    document.body.className = `font-size-${size}`;
    localStorage.setItem('fontSize', size);
  }, [updateSetting]);

  return (
    <div className="settings-container">
      <h2>{t('settings')}</h2>

      <div className="setting-section">
        <h3>{t('language')}</h3>
        <div className="setting-buttons">
          <button
            className={`setting-button ${settings.language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={`setting-button ${settings.language === 'he' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('he')}
          >
            עברית
          </button>
        </div>
      </div>

      <div className="setting-section">
        <h3>{t('map color')}</h3>
        <div className={`theme-toggle-container ${settings.language === 'he' ? 'rtl' : ''}`}>
          <ThemeToggle toggleTheme={toggleTheme} isDarkMode={settings.isDarkMode} />
        </div>
      </div>

      <div className="setting-section">
        <h3>{t('notifications')}</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.notificationsEnabled}
            onChange={() => updateSetting('notificationsEnabled', !settings.notificationsEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-section">
        <h3>{t('vibration')}</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={settings.vibrationEnabled}
            onChange={() => updateSetting('vibrationEnabled', !settings.vibrationEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-section">
        <h3>{t('font-size')}</h3>
        <div className="setting-buttons">
          {['small', 'medium', 'large'].map((size) => (
            <button
              key={size}
              className={`setting-button ${settings.fontSize === size ? 'active' : ''}`}
              onClick={() => handleFontSizeChange(size)}
            >
              {t(size)}
            </button>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default withOfflineOverlay(Settings);