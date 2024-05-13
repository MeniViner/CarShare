import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookmark, faMapLocationDot, faImage, faCog } from '@fortawesome/free-solid-svg-icons';

const Buttom = () => {
    return (
        <div className="buttom">
            <div className="profile-icon icon bt">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="saved-icon icon bt">
                <FontAwesomeIcon icon={faBookmark} />
            </div>
            <div className="map-icon icon bt">
                <FontAwesomeIcon icon={faMapLocationDot} />
            </div>
            <div className="another-icon icon bt">
                <FontAwesomeIcon icon={faImage} />
            </div>
            <div className="settings-icon icon bt">
                <FontAwesomeIcon icon={faCog} />
            </div>
        </div>
    );
};

export default Buttom;
