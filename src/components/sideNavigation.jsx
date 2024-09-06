// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import '../styles/SideNavigation.css';

// import { RiMenu3Fill, RiMenuFoldLine } from "react-icons/ri";
// import { AiOutlineMessage } from "react-icons/ai";
// import { IoSettingsOutline, IoMapSharp, IoBookmarksOutline, IoListSharp,  IoPricetagsOutline, IoSearch } from "react-icons/io5";
// import { LuCalendarCheck } from "react-icons/lu";

// import { auth } from '../data/firebaseConfig';


// const SideNavigation = () => {
//   const [isSideNavOpen, setIsSideNavOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }

//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//         localStorage.setItem('user', JSON.stringify(user));
//       } else {
//         setUser(null);
//         localStorage.removeItem('user');
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const toggleSideNav = () => setIsSideNavOpen(prev => !prev);

//   const closeSideNav = () => {
//     if (navigator.vibrate) {
//       navigator.vibrate(50); // Vibrate for 50ms
//     }
//     setIsSideNavOpen(false)
//   };



//   const handleSearch = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       closeSideNav();
//       navigate(`/utils/SearchResults?q=${searchQuery}`);
//     }
//   };

//   return (
//     <div className="side-navigation-page">
//       <div className={`sidenav ${isSideNavOpen ? 'open' : ''}`}>
//         <div className="side-menu">
//           <div className="side-menu-header">
//             <h2>Car Share</h2>
//           </div>

//           <div className="input-with-icon">
//             <IoSearch className='icon'/>
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch}
//             />
//           </div>

//           <Link to="/map" className={`side-menu-item ${location.pathname === '/map' ? 'active' : ''}`} onClick={closeSideNav}>
//             <IoMapSharp className='icon' />
//             <h3>Map</h3>
//           </Link>
//           {/* <Link to="/car-list" className={`side-menu-item ${location.pathname === '/car-list' ? 'active' : ''}`} onClick={closeSideNav}>
//             <IoListSharp className='icon' />
//             <h3>Car List</h3>
//           </Link> */}
//           <Link to="/saved" className={`side-menu-item ${location.pathname === '/saved' ? 'active' : ''}`} onClick={closeSideNav}>
//             <IoBookmarksOutline className='icon' />
//             <h3>Saved</h3>
//           </Link>
//           <Link to="/prices" className={`side-menu-item ${location.pathname === '/prices' ? 'active' : ''}`} onClick={closeSideNav}>
//             <IoPricetagsOutline className='icon' />
//             <h3>Prices</h3>
//           </Link>
//           <Link to="/my-reservations" className={`side-menu-item ${location.pathname === '/my-reservations' ? 'active' : ''}`} onClick={closeSideNav}>
//             <LuCalendarCheck className='icon' />
//             <h3>Reservation</h3>
//           </Link>

//           <div className="smi2">
//             <Link to="/contact-info" className={`side-menu-item ${location.pathname === '/contact-info' ? 'active' : ''}`} onClick={closeSideNav}>
//               <AiOutlineMessage className='icon' />
//               <h3>Contact</h3>
//             </Link>
//             <Link to="/settings" className={`side-menu-item ${location.pathname === '/settings' ? 'active' : ''}`} onClick={closeSideNav}>
//               <IoSettingsOutline className='icon' />
//               <h3>Settings</h3>
//             </Link>
//           </div>

//           <div className="side-menu-profile">
//             {user ? (
//               <Link to="/profile" onClick={closeSideNav}>
//                 <img src={user.photoURL || 'images/user.png'} alt="User Avatar" className="profile-photo" />
//                 <div className="profile-details">
//                   <p className="profile-name">{user.displayName || user.email}</p>
//                   <p className="profile-email">{user.email}</p>
//                 </div>
//               </Link>
//             ) : (
//               <Link to="/profile" className='side-menu-item' onClick={closeSideNav}>
//                 <img src='images/user.png' alt="User Avatar" className="profile-photo" />
//                 <div className="profile-details">
//                   <p className="profile-name">Hi Guest</p>
//                   <p className="profile-email">Log in here</p>
//                 </div>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="side-nav-bt">
//         <div className="left-icon" onClick={toggleSideNav}>
//           {isSideNavOpen ? <RiMenuFoldLine /> : <RiMenu3Fill />}
//         </div>
//       </div>

//       {isSideNavOpen && <div className="overlay" onClick={toggleSideNav}></div>}

//     </div>
//   );
// };

// export default SideNavigation;






import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/SideNavigation.css';

import { RiMenu3Fill, RiMenuFoldLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline, IoMapSharp, IoBookmarksOutline, IoPricetagsOutline, IoSearch } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";

import { auth } from '../data/firebaseConfig';
import { MdManageAccounts } from 'react-icons/md';

const SideNavigation = () => {
  const { t } = useTranslation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSideNav = () => setIsSideNavOpen(prev => !prev);

  const closeSideNav = () => {
    const vibrationEnabled = localStorage.getItem('vibrationEnabled');
    if (vibrationEnabled === 'true' && navigator.vibrate) {
      navigator.vibrate(50); // Vibrate for 50ms
    }
    setIsSideNavOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeSideNav();
      navigate(`/utils/SearchResults?q=${searchQuery}`);
    }
  };

  return (
    <nav className="side-navigation-page" aria-label={t('main navigation')}>
      <div className={`sidenav ${isSideNavOpen ? 'open' : ''}`}>
        <div className="side-menu">
          <div className="side-menu-header">
            <h2>{t('car share')}</h2>
          </div>

          <div className="input-with-icon">
            <IoSearch className='icon' aria-hidden="true" />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              aria-label={t('search')}
            />
          </div>

          <Link to="/map" className={`side-menu-item ${location.pathname === '/map' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoMapSharp className='icon' aria-hidden="true" />
            <h3>{t('map')}</h3>
          </Link>
          <Link to="/saved" className={`side-menu-item ${location.pathname === '/saved' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoBookmarksOutline className='icon' aria-hidden="true" />
            <h3>{t('saved')}</h3>
          </Link>
          <Link to="/prices" className={`side-menu-item ${location.pathname === '/prices' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoPricetagsOutline className='icon' aria-hidden="true" />
            <h3>{t('prices')}</h3>
          </Link>
          <Link to="/my-reservations" className={`side-menu-item ${location.pathname === '/my-reservations' ? 'active' : ''}`} onClick={closeSideNav}>
            <LuCalendarCheck className='icon' aria-hidden="true" />
            <h3>{t('reservation')}</h3>
          </Link>
          <Link to="/manage" className={`side-menu-item ${location.pathname === '/manage' ? 'active' : ''}`} onClick={closeSideNav}>
            <MdManageAccounts className='icon' aria-hidden="true" />
            <h3>{t('manage page')}</h3>
          </Link>


          <div className="smi2">
            <Link to="/contact-info" className={`side-menu-item ${location.pathname === '/contact-info' ? 'active' : ''}`} onClick={closeSideNav}>
              <AiOutlineMessage className='icon' aria-hidden="true" />
              <h3>{t('contact')}</h3>
            </Link>
            <Link to="/settings" className={`side-menu-item ${location.pathname === '/settings' ? 'active' : ''}`} onClick={closeSideNav}>
              <IoSettingsOutline className='icon' aria-hidden="true" />
              <h3>{t('settings')}</h3>
            </Link>
          </div>

          <div className="side-menu-profile">
            {user ? (
              <Link to="/profile" onClick={closeSideNav}>
                <img src={user.photoURL || 'images/user.png'} alt={t('user avatar')} className="profile-photo" />
                <div className="profile-details">
                  <p className="profile-name">{user.displayName || user.email}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
              </Link>
            ) : (
              <Link to="/profile" className='side-menu-item' onClick={closeSideNav}>
                <img src='images/user.png' alt={t('guest avatar')} className="profile-photo" />
                <div className="profile-details">
                  <p className="profile-name">{t('hi guest')}</p>
                  <p className="profile-email">{t('log in here')}</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="side-nav-bt" onClick={toggleSideNav} aria-label={isSideNavOpen ? t('close menu') : t('open menu')}>
        <div className="left-icon">
          {isSideNavOpen ? <RiMenuFoldLine aria-hidden="true" /> : <RiMenu3Fill aria-hidden="true" />}
        </div>
      </div>

      {isSideNavOpen && <div className="overlay" onClick={toggleSideNav}></div>}
    </nav>
  );
};

export default SideNavigation;