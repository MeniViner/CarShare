import React from 'react';
import { t } from 'i18next';
import '../../../styles/priceList.css';

const PriceList = () => {
  return (
    <div className="price-list">
      <p className="update-info">{t('price list updated')}</p>
      
      <div className="car-option">
        <h2>{t('small E')} | {t('5 seats')} | {t('Nissan Micra')}</h2>
        <img src="path-to-nissan-micra.jpg" alt="Nissan Micra" />
        <ul>
          <li>{t('hourly')} | 10 ₪ {t('per hour')} + 1.5 ₪ {t('per km')}</li>
          <li>{t('daily')} | 120 ₪ {t('per day')} + 1 ₪ {t('per km')}</li>
        </ul>
      </div>

      <div className="car-option">
        <h2>{t('small G')} | {t('5 seats')} | {t('Peugeot 208')}</h2>
        <img src="path-to-peugeot-208.jpg" alt="Peugeot 208" />
        <ul>
          <li>{t('hourly')} | 12 ₪ {t('per hour')} + 1.5 ₪ {t('per km')}</li>
          <li>{t('daily')} | 150 ₪ {t('per day')} + 1 ₪ {t('per km')}</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceList;
