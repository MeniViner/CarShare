// import React, { useState, useEffect } from 'react';
// import withOfflineOverlay from '../assets/withOfflineOverlay';
// import ThemeToggle from '../assets/themeToggle';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useTranslation } from 'react-i18next';
// import '../styles/settings.css'

// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { auth, db } from '../data/firebaseConfig';



// const Settings = () => {

//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? savedTheme === 'dark' : false;
//   });
  
//   const { t, i18n } = useTranslation();
//   const [language, setLanguage] = useState('en'); 


//   const saveUserSettings = async (settings) => {
//     try {
//       await addDoc(collection(db, 'settings'), {
//         userId: auth.currentUser.uid,
//         ...settings,
//       });
//       // console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }
//   };

//   const getUserSettings = async () => {
//     try {
//       const q = query(collection(db, 'settings'), where('userId', '==', auth.currentUser.uid));
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const userSettings = querySnapshot.docs[0].data();
//         return userSettings.language || 'en';
//       }
//     } catch (e) {
//       console.error('Error getting document: ', e);
//     }
//     return 'en';
//   };


//   useEffect(() => {
//     const fetchSettings = async () => {
//       const storedLanguage = localStorage.getItem('language');
//       if (storedLanguage) {
//         setLanguage(storedLanguage);
//         i18n.changeLanguage(storedLanguage);
//         document.documentElement.dir = storedLanguage === 'he' ? 'rtl' : 'ltr';
//       } else {
//         const userLanguage = await getUserSettings();
//         setLanguage(userLanguage);
//         i18n.changeLanguage(userLanguage);
//         document.documentElement.dir = userLanguage === 'he' ? 'rtl' : 'ltr';
//       }
//     };
//     fetchSettings();
//     localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
//   }, [i18n, isDarkMode]);


//   const handleLanguageChange = (lang) => {
//     if (!auth.currentUser) {
//       console.info(t('info-lang'))
//     }

//     setLanguage(lang);
//     localStorage.setItem('language', lang);
//     saveUserSettings({ language: lang });
//     i18n.changeLanguage(lang).then(() => {
//       document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
//       if (auth.currentUser) {
//         console.info(t('lang-saved'))
//       }
//     });
//   };


//   const toggleTheme = () => {
//     setIsDarkMode(prevMode => !prevMode);
//     // document.body.classList.toggle('dark-mode', !isDarkMode);
//     // document.body.classList.toggle('light-mode', isDarkMode);
//   };

//   return (
//     <div className="settings-container">
//       <h2>{t('settings')}</h2>

//       <div className="language-settings">
//         <p>{t('set-language')}</p>
//         <div className="language-buttons">
//           <button
//             className={`language-button ${language === 'en' ? 'active' : ''}`}
//             onClick={() => handleLanguageChange('en')}
//           >
//             English
//           </button>
//           <button
//             className={`language-button ${language === 'he' ? 'active' : ''}`}
//             onClick={() => handleLanguageChange('he')}
//           >
//             עברית
//           </button>
//         </div>
//       </div>

//       <div className="theme-settings">
//         <p>{t('map-color')}</p>
//         <div className={`theme-toggle-container ${language === 'he' ? 'rtl' : ''}`}>
//           <ThemeToggle toggleTheme={toggleTheme} />
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default withOfflineOverlay(Settings);

















// import React, { useState, useEffect } from 'react';
// import withOfflineOverlay from '../assets/withOfflineOverlay';
// import ThemeToggle from '../assets/themeToggle';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useTranslation } from 'react-i18next';
// import '../styles/settings.css'

// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { auth, db } from '../data/firebaseConfig';

// const Settings = () => {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? savedTheme === 'dark' : false;
//   });
  
//   const { t, i18n } = useTranslation();
//   const [language, setLanguage] = useState('en');
//   const [notificationsEnabled, setNotificationsEnabled] = useState(false);
//   const [vibrationEnabled, setVibrationEnabled] = useState(true);
//   const [fontSize, setFontSize] = useState('medium');

//   const saveUserSettings = async (settings) => {
//     try {
//       await addDoc(collection(db, 'settings'), {
//         userId: auth.currentUser.uid,
//         ...settings,
//       });
//       toast.success(t('settings-saved'));
//     } catch (e) {
//       console.error('Error adding document: ', e);
//       toast.error(t('error-saving-settings'));
//     }
//   };

//   const getUserSettings = async () => {
//     try {
//       const q = query(collection(db, 'settings'), where('userId', '==', auth.currentUser.uid));
//       const querySnapshot = await getDocs(q);
//       if (!querySnapshot.empty) {
//         const userSettings = querySnapshot.docs[0].data();
//         return {
//           language: userSettings.language || 'en',
//           notificationsEnabled: userSettings.notificationsEnabled || false,
//           vibrationEnabled: userSettings.vibrationEnabled !== undefined ? userSettings.vibrationEnabled : true,
//           fontSize: userSettings.fontSize || 'medium',
//           isDarkMode: userSettings.isDarkMode || false
//         };
//       }
//     } catch (e) {
//       console.error('Error getting document: ', e);
//     }
//     return {
//       language: 'en',
//       notificationsEnabled: false,
//       vibrationEnabled: true,
//       fontSize: 'medium',
//       isDarkMode: false
//     };
//   };

//   useEffect(() => {
//     const fetchSettings = async () => {
//       const storedSettings = await getUserSettings();
//       setLanguage(storedSettings.language);
//       setNotificationsEnabled(storedSettings.notificationsEnabled);
//       setVibrationEnabled(storedSettings.vibrationEnabled);
//       setFontSize(storedSettings.fontSize);
//       setIsDarkMode(storedSettings.isDarkMode);
//       i18n.changeLanguage(storedSettings.language);
//       document.documentElement.dir = storedSettings.language === 'he' ? 'rtl' : 'ltr';
//       document.body.className = `font-size-${storedSettings.fontSize}`;
//       document.documentElement.setAttribute('data-theme', storedSettings.isDarkMode ? 'dark' : 'light');
//     };
//     fetchSettings();
//   }, [i18n]);

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang);
//     saveUserSettings({ language: lang });
//     i18n.changeLanguage(lang).then(() => {
//       document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
//     });
//   };

//   const toggleTheme = () => {
//     const newDarkMode = !isDarkMode;
//     setIsDarkMode(newDarkMode);
//     saveUserSettings({ isDarkMode: newDarkMode });
//     document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
//     localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
//   };

//   const handleNotificationToggle = () => {
//     setNotificationsEnabled(prev => !prev);
//     saveUserSettings({ notificationsEnabled: !notificationsEnabled });
//   };

//   const handleVibrationToggle = () => {
//     setVibrationEnabled(prev => !prev);
//     saveUserSettings({ vibrationEnabled: !vibrationEnabled });
//     localStorage.setItem('vibrationEnabled', (!vibrationEnabled).toString());
//   };

//   const handleFontSizeChange = (size) => {
//     setFontSize(size);
//     saveUserSettings({ fontSize: size });
//     document.body.className = `font-size-${size}`;
//     localStorage.setItem('fontSize', size);
//   };

//   return (
//     <div className="settings-container">
//       <h2>{t('settings')}</h2>

//       <div className="setting-section">
//         <h3>{t('language')}</h3>
//         <div className="setting-buttons">
//           <button
//             className={`setting-button ${language === 'en' ? 'active' : ''}`}
//             onClick={() => handleLanguageChange('en')}
//           >
//             English
//           </button>
//           <button
//             className={`setting-button ${language === 'he' ? 'active' : ''}`}
//             onClick={() => handleLanguageChange('he')}
//           >
//             עברית
//           </button>
//         </div>
//       </div>

//       <div className="setting-section">
//         <h3>{t('theme')}</h3>
//         <div className={`theme-toggle-container ${language === 'he' ? 'rtl' : ''}`}>
//           <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
//         </div>
//       </div>

//       <div className="setting-section">
//         <h3>{t('notifications')}</h3>
//         <label className="toggle-switch">
//           <input
//             type="checkbox"
//             checked={notificationsEnabled}
//             onChange={handleNotificationToggle}
//           />
//           <span className="slider round"></span>
//         </label>
//       </div>

//       <div className="setting-section">
//         <h3>{t('vibration')}</h3>
//         <label className="toggle-switch">
//           <input
//             type="checkbox"
//             checked={vibrationEnabled}
//             onChange={handleVibrationToggle}
//           />
//           <span className="slider round"></span>
//         </label>
//       </div>

//       <div className="setting-section">
//         <h3>{t('font-size')}</h3>
//         <div className="setting-buttons">
//           <button
//             className={`setting-button ${fontSize === 'small' ? 'active' : ''}`}
//             onClick={() => handleFontSizeChange('small')}
//           >
//             {t('small')}
//           </button>
//           <button
//             className={`setting-button ${fontSize === 'medium' ? 'active' : ''}`}
//             onClick={() => handleFontSizeChange('medium')}
//           >
//             {t('medium')}
//           </button>
//           <button
//             className={`setting-button ${fontSize === 'large' ? 'active' : ''}`}
//             onClick={() => handleFontSizeChange('large')}
//           >
//             {t('large')}
//           </button>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default withOfflineOverlay(Settings);









import React, { useState, useEffect } from 'react';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import ThemeToggle from '../assets/themeToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import '../styles/settings.css'

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../data/firebaseConfig';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  const saveUserSettings = async (settings) => {
    if (!auth.currentUser) {
      toast.error(t('please-login'));
      return;
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        settings: {
          ...settings,
          isDarkMode,
          language,
          notificationsEnabled,
          vibrationEnabled,
          fontSize
        }
      });
      toast.success(t('settings-saved'), {
        position: "top-center",  // מיקום במרכז העליון של המסך
        autoClose: 1500,  // ההודעה תיסגר לאחר 2 שניות (2000 מילישניות)
        hideProgressBar: true,  // הסתרת בר התקדמות
        closeOnClick: true,  // סגירה על קליק
        pauseOnHover: true,  // השהייה כאשר מעבירים את העכבר
        draggable: true,  // מאפשר גרירה
        progress: undefined,  // הגדרה דינמית של התקדמות
      });
    } catch (e) {
      console.error('Error updating document: ', e);
      toast.error(t('error-saving-settings'));
    }
  };

  const getUserSettings = async () => {
    if (!auth.currentUser) {
      return {
        language: 'en',
        notificationsEnabled: false,
        vibrationEnabled: true,
        fontSize: 'medium',
        isDarkMode: false
      };
    }
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.settings || {
          language: 'en',
          notificationsEnabled: false,
          vibrationEnabled: true,
          fontSize: 'medium',
          isDarkMode: false
        };
      }
    } catch (e) {
      console.error('Error getting document: ', e);
    }
    return {
      language: 'en',
      notificationsEnabled: false,
      vibrationEnabled: true,
      fontSize: 'medium',
      isDarkMode: false
    };
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const storedSettings = await getUserSettings();
      setLanguage(storedSettings.language);
      setNotificationsEnabled(storedSettings.notificationsEnabled);
      setVibrationEnabled(storedSettings.vibrationEnabled);
      setFontSize(storedSettings.fontSize);
      setIsDarkMode(storedSettings.isDarkMode);
      i18n.changeLanguage(storedSettings.language);
      document.documentElement.dir = storedSettings.language === 'he' ? 'rtl' : 'ltr';
      document.body.className = `font-size-${storedSettings.fontSize}`;
      document.documentElement.setAttribute('data-theme', storedSettings.isDarkMode ? 'dark' : 'light');
    };
    fetchSettings();
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    saveUserSettings({ language: lang });
    i18n.changeLanguage(lang).then(() => {
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    });
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveUserSettings({ isDarkMode: newDarkMode });
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const handleNotificationToggle = () => {
    const newNotificationsEnabled = !notificationsEnabled;
    setNotificationsEnabled(newNotificationsEnabled);
    saveUserSettings({ notificationsEnabled: newNotificationsEnabled });
  };

  const handleVibrationToggle = () => {
    const newVibrationEnabled = !vibrationEnabled;
    setVibrationEnabled(newVibrationEnabled);
    saveUserSettings({ vibrationEnabled: newVibrationEnabled });
    localStorage.setItem('vibrationEnabled', newVibrationEnabled.toString());
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    saveUserSettings({ fontSize: size });
    document.body.className = `font-size-${size}`;
    localStorage.setItem('fontSize', size);
  };

  return (
    <div className="settings-container">
      <h2>{t('settings')}</h2>

      <div className="setting-section">
        <h3>{t('language')}</h3>
        <div className="setting-buttons">
          <button
            className={`setting-button ${language === 'en' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={`setting-button ${language === 'he' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('he')}
          >
            עברית
          </button>
        </div>
      </div>

      <div className="setting-section">
        <h3>{t('theme')}</h3>
        <div className={`theme-toggle-container ${language === 'he' ? 'rtl' : ''}`}>
          <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
      </div>

      <div className="setting-section">
        <h3>{t('notifications')}</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-section">
        <h3>{t('vibration')}</h3>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={vibrationEnabled}
            onChange={handleVibrationToggle}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="setting-section">
        <h3>{t('font-size')}</h3>
        <div className="setting-buttons">
          <button
            className={`setting-button ${fontSize === 'small' ? 'active' : ''}`}
            onClick={() => handleFontSizeChange('small')}
          >
            {t('small')}
          </button>
          <button
            className={`setting-button ${fontSize === 'medium' ? 'active' : ''}`}
            onClick={() => handleFontSizeChange('medium')}
          >
            {t('medium')}
          </button>
          <button
            className={`setting-button ${fontSize === 'large' ? 'active' : ''}`}
            onClick={() => handleFontSizeChange('large')}
          >
            {t('large')}
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default withOfflineOverlay(Settings);