import React, { useState, useEffect } from 'react';
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import '../styles/themeToggle.css';


const ThemeToggle = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // טען את מצב הנושא מ-localStorage אם קיים
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });


  useEffect(() => {
    // שמור את מצב הנושא ב-localStorage בכל שינוי
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);


  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  

  return (
    <div className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} onClick={handleToggleTheme}>
      <div className="toggle-track">
        <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
          {isDarkMode ? <IoMdMoon /> : <IoMdSunny />}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
