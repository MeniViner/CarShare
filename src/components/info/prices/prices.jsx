import React, { useState } from 'react';
import { t } from 'i18next';
import PriceList from './priceList';
import AdditionalCharges from './additionalCharges';
import '../../../styles/prices.css';

const Prices = () => {
  const [activeTab, setActiveTab] = useState('priceList');

  return (
    <div className="prices-container">
      <div className="prices-header">
      <p></p>

        <h1>{t('prices')}</h1>
        <p></p>
      </div>
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === 'priceList' ? 'active' : ''}`}
          onClick={() => setActiveTab('priceList')}
        >
          {t('price list')}
        </button>
        <button
          className={`tab-button ${activeTab === 'additionalCharges' ? 'active' : ''}`}
          onClick={() => setActiveTab('additionalCharges')}
        >
          {t('additional charges')}
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'priceList' && <PriceList />}
        {activeTab === 'additionalCharges' && <AdditionalCharges />}
      </div>
    </div>
  );
};

export default Prices;
