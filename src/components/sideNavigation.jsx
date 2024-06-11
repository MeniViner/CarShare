import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './design/themeToggle';

const SideNavigation = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const openSideNav = () => setIsSideNavOpen(true);
  const closeSideNav = () => setIsSideNavOpen(false);

  return (
    <>
      <div className={`sidenav ${isSideNavOpen ? 'open' : ''}`}>
        Side Navigation Content
        <br />
        1
        <br />
        2
        <br />
        carShare 0.0.2.6
      </div>

      <div className="side-nav-bt">
        <div className="left-icon faBarsStaggered" onClick={openSideNav}>
          <FontAwesomeIcon icon={faBarsStaggered} />
        </div>
      </div>

      {isSideNavOpen && <div className="overlay" onClick={closeSideNav}></div>}
    </>
  );
};

export default SideNavigation;