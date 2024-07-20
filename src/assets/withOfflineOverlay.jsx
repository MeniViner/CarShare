// withOfflineOverlay.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';


const withOfflineOverlay = (WrappedComponent) => {
  const WithOfflineOverlay = (props) => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    return (
      <>
        {isOffline && 
            <div className="offline-container">
              <FontAwesomeIcon icon={faWifi} size="5x" className="offline-icon" />
              <h2 className="offline-text">You're currently Offline</h2>
              <p className="offline-message">Please check your internet connection.</p>
            </div>
        }
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithOfflineOverlay;
};

export default withOfflineOverlay;