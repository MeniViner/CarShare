import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/SideNavigation.css';

import { RiMenu3Fill, RiMenuFoldLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { CgFileDocument } from "react-icons/cg";
import { IoSettingsOutline , IoBookmarksOutline, IoPricetagsOutline, IoSearch } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineManageAccounts  } from 'react-icons/md';

import { auth } from '../data/firebaseConfig';

const USER_CACHE_KEY = 'cachedUser';

const SideNavigation = () => {
  const { t } = useTranslation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_CACHE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem(USER_CACHE_KEY);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleSideNav = useCallback(() => setIsSideNavOpen(prev => !prev), []);

  const closeSideNav = useCallback(() => {
    // const vibrationEnabled = localStorage.getItem('vibrationEnabled');
    // if (vibrationEnabled === 'true' && navigator.vibrate) {
    //   navigator.vibrate(50); // Vibrate for 50ms
    // }
    if (navigator.vibrate) { // need to move it into firebase setting..
      navigator.vibrate(50);
    }

    setIsSideNavOpen(false);
  }, []);

  const handleSearch = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      closeSideNav();
      navigate(`/utils/SearchResults?q=${searchQuery}`);
    }
  }, [closeSideNav, navigate, searchQuery]);

  const menuItems = useMemo(() => [
    { to: '/map', icon: GrMapLocation  , label: t('map') },
    { to: '/saved', icon: IoBookmarksOutline, label: t('saved') },
    { to: '/prices', icon: IoPricetagsOutline, label: t('prices') },
    { to: '/my-reservations', icon: LuCalendarCheck, label: t('reservation') },
    { to: '/manage', icon: MdOutlineManageAccounts , label: t('manage page') },
    { to: '/contact-info', icon: AiOutlineMessage, label: t('contact'), className: 'smi2' },
    { to: '/terms-of-use', icon: CgFileDocument, label: t('terms of use')},
    { to: '/settings', icon: IoSettingsOutline, label: t('settings') },
  ], [t]); //usememo unless t changes -תלות 

  const renderMenuItem = useCallback((item) => (
    <Link 
      key={item.to}
      to={item.to} 
      className={`side-menu-item ${location.pathname === item.to ? 'active' : ''} ${item.className || ''}`} 
      onClick={closeSideNav}
    >
      <item.icon className='icon' aria-hidden="true" />
      <h3>{item.label}</h3>
    </Link>
  ), [location.pathname, closeSideNav]);

  const renderProfileSection = useMemo(() => (
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
  ), [user, closeSideNav, t]);

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

          {menuItems.map(renderMenuItem)}

          {renderProfileSection}
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

export default React.memo(SideNavigation);
