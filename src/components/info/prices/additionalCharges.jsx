import React from 'react';
import { t } from 'i18next';
import '../../../styles/additionalCharges.css';


const AdditionalCharges = () => {
  return (
    <div className="additional-charges">
      <div className="charge-item">
        <h3>{t('non return to original station')}</h3>
        <p>{t('within one minute walk: no charge')}</p>
        <p>{t('more than one minute: up to 500 meters')}: 250₪</p>
        <p>{t('beyond that')} 250 ₪ + 3 ₪ {t('per km')} *</p>
      </div>

      <div className="charge-item">
        <h3>{t('late return')}</h3>
        <p>{t('up to 10 minutes')} 1.5 ₪ {t('per minute')}</p>
        <p>{t('more than 10 minutes')} 50 ₪ + 1.5 ₪ {t('per minute late')}</p>
        <p>{t('must inform call center')}</p>
      </div>

      <div className="charge-item">
        <h3>{t('reservation cancellation')}</h3>
        <p>{t('up to 2 hours before')}</p>
        <p>{t('less than 2 hours before')}</p>
        <p>{t('50% of the reservation amount')}</p>
      </div>

      <div className="charge-item">
        <h3>{t('reservation cancellation')}</h3>
        <p>{t('up to 2 hours before')}</p>
        <p>{t('less than 2 hours before')}</p>
        <p>{t('50% of the reservation amount')}</p>
      </div>

      <div className="charge-item">
        <h3>{t('reservation cancellation')}</h3>
        <p>{t('up to 2 hours before')}</p>
        <p>{t('less than 2 hours before')}</p>
        <p>{t('50% of the reservation amount')}</p>
      </div>
    </div>
  );
};

export default AdditionalCharges;
