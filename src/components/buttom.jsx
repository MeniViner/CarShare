import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookmark, faMapLocationDot, faListUl, faCog } from '@fortawesome/free-solid-svg-icons';
import '../styles/buttom.css';

const Buttom = () => {
    const location = useLocation();

    const isActive = (pathname) => {
        return location.pathname === pathname;
    };

    return (
        <div className="buttom-menu">
            <div className="buttom">
                <Link to="/profile" className={`faUser icon bt buttom-menu-bt ${isActive('/profile') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>
                <Link to="/saved" className={`faBookmark icon bt buttom-menu-bt ${isActive('/saved') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faBookmark} />
                </Link>
                <Link to="/map" className={`faMapMarkerAlt icon bt buttom-menu-bt ${isActive('/map') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faMapLocationDot} />
                </Link>
                <Link to="/car-list" className={`faListUl icon bt buttom-menu-bt ${isActive('/car-list') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faListUl} />
                </Link>
                <Link to="/settings" className={`faCog icon bt buttom-menu-bt ${isActive('/settings') ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faCog} />
                </Link>
            </div>
        </div>
    );
};

export default Buttom;
