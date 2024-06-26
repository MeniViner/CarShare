import React from 'react';
import '../styles/loadingAndOffline.css';

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h2 className="loading-text">Loading Data...</h2>
    </div>
  );
};

export default LoadingPage;
