import React from 'react';
import { t } from 'i18next';
import '../styles/loadingAndOffline.css';

const LoadingPage = () => {
  return (
    <div className="loading-container">
          <h3>{t('please wait')}.</h3>
      <div className="loading-spinner"></div>
      <h2 className="loading-text">{t('Loading Data')}...</h2>
    </div>
  );
};

export default LoadingPage;
