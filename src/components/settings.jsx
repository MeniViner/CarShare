import React, { useState } from 'react';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import ThemeToggle from './design/themeToggle';
import { useTranslation } from 'react-i18next';
import { AiFillFlag } from 'react-icons/ai';
import { BsFillFlagFill } from 'react-icons/bs';

const Settings = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark-mode', !isDarkMode); // אופציונלי, לעדכן את גוף המסמך
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'he' : 'en';
        i18n.changeLanguage(newLang);
        localStorage.setItem('language', newLang); // שמור את השפה שנבחרה
    };

    return (
        <>
            <div className="settings-container">
            <h2>{t('settings')}</h2>

            <div>
                <p>{t('welcome')}</p>
            </div>


            <button onClick={toggleLanguage} className="language-toggle">
            {i18n.language === 'en' ? (
                <>
                <BsFillFlagFill /> עברית
                </>
            ) : (
                <>
                <AiFillFlag /> English
                </>
            )}
            </button>

                <p>map color</p>
                <p>{t('map-color')}</p>
                <ThemeToggle toggleTheme={toggleTheme} />
            </div>    
        </>
    );
};

export default withOfflineOverlay(Settings);