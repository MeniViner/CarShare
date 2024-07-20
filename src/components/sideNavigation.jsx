
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { RiMenu3Fill, RiMenuFoldLine } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSettingsOutline, IoMapSharp, IoBookmarksOutline, IoListSharp,  IoPricetagsOutline  } from "react-icons/io5";
import '../styles/SideNavigation.css';
import { auth } from '../data/firebaseConfig'; // ייבוא האותנטיקציה מ-Firebase
// import Icon from '@mdi/react';

const SideNavigation = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // הוספת useHistory בתוך הקומפוננטה
  const [searchQuery, setSearchQuery] = useState(''); // הוספת מצב לחיפוש

  const handleSearch = (e) => {
    e.preventDefault();
    closeSideNav();
    navigate(`/utils/SearchResults?q=${searchQuery}`); // עדכון הנתיב בהתאם למיקום הקובץ
  };
  

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // קבלת פרטי המשתמש מה-LocalStorage
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
  const closeSideNav = () => setIsSideNavOpen(false);

  return (
    <>
      <div className={`sidenav ${isSideNavOpen ? 'open' : ''}`}>
        <div className="side-menu">
          {/* App Title and Logo */}
          <div className="side-menu-header">
            <h2>Car Share</h2>
          </div>

          {/* Search Functionality */}
          <div className="side-menu-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>

          {/* Navigation Links */}
          <Link to="/map" className='side-menu-item' onClick={closeSideNav}>
            <IoMapSharp className='icon'/>
            <h3>Map</h3>
          </Link>
          <Link to="/saved" className='side-menu-item' onClick={closeSideNav}>
            <IoBookmarksOutline  className='icon'/>
            <h3>Saved</h3>
          </Link>
          <Link to="/car-list" className='side-menu-item' onClick={closeSideNav}>
            <IoListSharp className='icon'/>
            <h3>Car List</h3>
          </Link>
          <Link to="/prices" className='side-menu-item' onClick={closeSideNav}>
            <IoPricetagsOutline className='icon'/>
            <h3>Prices</h3>
          </Link>
          <div className="smi2">
            <Link to="/contact-info" className='side-menu-item ' onClick={closeSideNav}>
              <AiOutlineMessage  className='icon'/>
              <h3>Contact</h3>
            </Link>
            <Link to="/settings" className='side-menu-item' onClick={closeSideNav}>
              <IoSettingsOutline className='icon'/>
              <h3>Settings</h3>
            </Link>
          </div>
          {/* Profile Section */}
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
                  <p className="profile-email">log in here</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="side-nav-bt">
        <div className="left-icon" onClick={toggleSideNav}>
          {isSideNavOpen ? <RiMenuFoldLine  /> : <RiMenu3Fill  />}
        </div>
      </div>

      {isSideNavOpen && <div className="overlay" onClick={toggleSideNav}></div>}
    </>
  );
};

export default SideNavigation;
