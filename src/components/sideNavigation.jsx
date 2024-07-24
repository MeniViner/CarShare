import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/SideNavigation.css';

import { triggerHapticFeedback } from '../utils/hapticFeedback';
import { RiMenu3Fill, RiMenuFoldLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline, IoMapSharp, IoBookmarksOutline, IoListSharp,  IoPricetagsOutline, IoSearch } from "react-icons/io5";

import { auth } from '../data/firebaseConfig';
import VibrationTest from './VibrationTest'; // Import the VibrationTest component


const SideNavigation = () => {
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
    // e.preventDefault();
    // triggerHapticFeedback();
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibrate for 50ms
    }
    setIsSideNavOpen(false)
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeSideNav();
      navigate(`/utils/SearchResults?q=${searchQuery}`);
    }
  };

  return (
    <>
      <div className={`sidenav ${isSideNavOpen ? 'open' : ''}`}>
        <div className="side-menu">
          <div className="side-menu-header">
            <h2>Car Share</h2>
          </div>

          <div className="input-with-icon">
            <IoSearch className='icon'/>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          <Link to="/map" className={`side-menu-item ${location.pathname === '/map' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoMapSharp className='icon' />
            <h3>Map</h3>
          </Link>
          <Link to="/saved" className={`side-menu-item ${location.pathname === '/saved' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoBookmarksOutline className='icon' />
            <h3>Saved</h3>
          </Link>
          <Link to="/car-list" className={`side-menu-item ${location.pathname === '/car-list' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoListSharp className='icon' />
            <h3>Car List</h3>
          </Link>
          <Link to="/prices" className={`side-menu-item ${location.pathname === '/prices' ? 'active' : ''}`} onClick={closeSideNav}>
            <IoPricetagsOutline className='icon' />
            <h3>Prices</h3>
          </Link>
          <div className="smi2">
            <Link to="/contact-info" className={`side-menu-item ${location.pathname === '/contact-info' ? 'active' : ''}`} onClick={closeSideNav}>
              <AiOutlineMessage className='icon' />
              <h3>Contact</h3>
            </Link>
            <Link to="/settings" className={`side-menu-item ${location.pathname === '/settings' ? 'active' : ''}`} onClick={closeSideNav}>
              <IoSettingsOutline className='icon' />
              <h3>Settings</h3>
            </Link>
            <VibrationTest />
          </div>

          <div className="side-menu-profile">
            {user ? (
              <Link to="/profile" onClick={closeSideNav}>
                <img src={user.photoURL || 'images/user.png'} alt="User Avatar" className="profile-photo" />
                <div className="profile-details">
                  <p className="profile-name">{user.displayName || user.email}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
              </Link>
            ) : (
              <Link to="/profile" className='side-menu-item' onClick={closeSideNav}>
                <img src='images/user.png' alt="User Avatar" className="profile-photo" />
                <div className="profile-details">
                  <p className="profile-name">Hi Guest</p>
                  <p className="profile-email">Log in here</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="side-nav-bt">
        <div className="left-icon" onClick={toggleSideNav}>
          {isSideNavOpen ? <RiMenuFoldLine /> : <RiMenu3Fill />}
        </div>
      </div>

      {isSideNavOpen && <div className="overlay" onClick={toggleSideNav}></div>}

      
    </>
  );
};

export default SideNavigation;
