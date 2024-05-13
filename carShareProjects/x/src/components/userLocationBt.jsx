import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation  } from '@fortawesome/free-solid-svg-icons';

const UserLocationBt = () => {
  return (
    <div className='location-button'>
        <button className='faLocation' >
            <FontAwesomeIcon icon={faLocation}/>
        </button>
    </div>
  );
};

export default UserLocationBt;
