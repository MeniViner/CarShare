import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../../styles/themeToggle.css';


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
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    toggleTheme(newTheme); 
  };

  return (
    <div className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} onClick={handleToggleTheme}>
      <div className="toggle-track">
        <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
