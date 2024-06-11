// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
// import './themeToggle.css'; // Import your CSS file

// const ThemeToggle = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(prevMode => !prevMode);
//     // You can add logic to switch between dark and light themes here
//   };

//   return (
//     <div className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleTheme}>
//       <div className="toggle-track">
//         <div className={`toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
//           <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThemeToggle;




import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../../styles/themeToggle.css';


const ThemeToggle = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    toggleTheme(); // Call the toggleTheme function from the prop
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