import React, { useState } from 'react';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import ThemeToggle from './design/themeToggle';


const Settings = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark-mode', !isDarkMode); // אופציונלי, לעדכן את גוף המסמך
    };

    return (
        <>
            <div className="user-settings">
                <h1>Settings</h1>

                <p>map color</p>
                <ThemeToggle toggleTheme={toggleTheme} />
            </div>    
        </>
    );
};

export default withOfflineOverlay(Settings);