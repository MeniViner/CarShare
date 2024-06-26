// import React, { useState } from 'react';
// import withOfflineOverlay from '../assets/withOfflineOverlay';
// import ThemeToggle from './design/themeToggle';
// import { useTranslation } from 'react-i18next';
// import { AiFillFlag } from 'react-icons/ai';
// import { BsFillFlagFill } from 'react-icons/bs';

// const Settings = () => {

//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const { t, i18n } = useTranslation();

//     const toggleTheme = () => {
//         setIsDarkMode(prevMode => !prevMode);
//         document.body.classList.toggle('dark-mode', !isDarkMode); // אופציונלי, לעדכן את גוף המסמך
//     };

//     const toggleLanguage = () => {
        // const newLang = i18n.language === 'en' ? 'he' : 'en';
        // i18n.changeLanguage(newLang);
        // localStorage.setItem('language', newLang); // שמור את השפה שנבחרה
//     };

//     return (
//         <>
//             <div className="settings-container">
//             <h2>{t('settings')}</h2>

//             <div>
//                 <p>{t('welcome')}</p>
//             </div>


//             <button onClick={toggleLanguage} className="language-toggle">
//             {i18n.language === 'en' ? (
//                 <>
//                 <BsFillFlagFill /> עברית
//                 </>
//             ) : (
//                 <>
//                 <AiFillFlag /> English
//                 </>
//             )}
//             </button>

//                 <p>map color</p>
//                 <p>{t('map-color')}</p>
//                 <ThemeToggle toggleTheme={toggleTheme} />
//             </div>    
//         </>
//     );
// };

// export default withOfflineOverlay(Settings);





import React, { useState, useEffect } from 'react';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import ThemeToggle from './design/themeToggle';
import { useTranslation } from 'react-i18next';
import { US, IL } from 'country-flag-icons/react/3x2'
import '../styles/settings.css'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../data/firebaseConfig';

const Settings = () => {
  const saveUserSettings = async (settings) => {
    try {
      const docRef = await addDoc(collection(db, 'settings'), {
        userId: auth.currentUser.uid,
        ...settings,
      });
      console.log('Document written with ID: ', docRef.id);
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

  const [isDarkMode, setIsDarkMode] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en'); // 'en' עבור אנגלית, 'he' עבור עברית

  useEffect(() => {
    const fetchSettings = async () => {
      const userLanguage = await getUserSettings();
      setLanguage(userLanguage);
      i18n.changeLanguage(userLanguage);
    };
    fetchSettings();
  }, []);

  const handleLanguageChange = (lang) => {
    if (!auth.currentUser) {
      // throw new Error('User is not authenticated');
      // Swal.fire('Please log in', 'To sat your language, please log in.', 'info'); 
      toast.info(t('info-lang'), {
        draggable: true,
      });
        
    }


    setLanguage(lang);
    saveUserSettings({ language: lang });
    i18n.changeLanguage(lang);
    if(auth.currentUser)
      toast.success(t('lang-saved'), {
        draggable: true,
      });
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className="settings-container">
      <h2>{t('settings')}</h2>

      <div>
        <p>{t('welcome')}</p>
      </div>

      <p>{t('set-language')}</p>
      <div className="flag-icons ">
        <US
          className={`country-flag flag-icon ${language === 'en' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('en')}
          style={{ width: '2em', height: '2em' }}
        />
        
        <IL
          className={  ` country-flag flag-icon ${language === 'he' ? 'active' : ''}`}
          onClick={() => handleLanguageChange('he')}
          style={{ width: '2em', height: '2em' }}
        />
      </div>

      <p>{t('map-color')}</p>
      <ThemeToggle toggleTheme={toggleTheme} />
      <ToastContainer />
    </div>
  );
};

export default withOfflineOverlay(Settings);
