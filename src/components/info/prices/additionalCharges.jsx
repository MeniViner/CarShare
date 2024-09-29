import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/additionalCharges.css';

const AdditionalCharges = () => {
  const { t } = useTranslation();

  return (
    <div className="additional-charges">
      <h2 className="charges-title">{t('Additional Charges')}</h2>
      <div className="charges-list">
        <div className="charge-item">
          <h3>{t('late return')}</h3>
          <p>{t('up to 10 minutes')} 1.5 ₪ {t('per minute')}</p>
          <p>{t('more than 10 minutes')} 50 ₪ + 1.5 ₪ {t('per minute late')}</p>
          <p>{t('must inform call center')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('fuel surcharge')}</h3>
          <p>{t('if the car is returned with less than a quarter tank of fuel')}: 50₪ {t('plus cost of fuel')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('cleaning fee')}</h3>
          <p>{t('if the car is returned excessively dirty')}: 100₪ {t('standard cleaning fee')}</p>
          <p>{t('deep cleaning or damage to interior')} 250₪</p>
        </div>

        <div className="charge-item">
          <h3>{t('mileage overage')}</h3>
          <p>{t('up to 100 km included per rental')}</p>
          <p>{t('over 100 km')}: 2₪ {t('per km')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('toll roads')}</h3>
          <p>{t('any toll road fees will be passed to the user with an additional processing fee of')}: 10₪</p>
        </div>

        <div className="charge-item">
          <h3>{t('damaged or missing accessories')}</h3>
          <p>{t('loss or damage to items like GPS, chargers, or child seats will result in a replacement fee of')} 150₪ {t('per item')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('early return fee')}</h3>
          <p>{t('if the car is returned more than 1 hour before the scheduled time')}: 50₪ {t('early return fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('lost key fee')}</h3>
          <p>{t('if the key or key fob is lost or damaged')}: 500₪ {t('replacement fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('smoking in vehicle')}</h3>
          <p>{t('if smoking is detected inside the vehicle')}: 300₪ {t('cleaning and deodorizing fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('unauthorized driver')}</h3>
          <p>{t('if the car is driven by someone not authorized under the rental agreement')}: 750₪ {t('unauthorized driver penalty')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('battery jump-start fee')}</h3>
          <p>{t('if the battery needs to be jump-started due to user negligence')}: 200₪ {t('service fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('parking violation fee')}</h3>
          <p>{t('if the car is involved in any parking violations during the rental period')}: {t('actual fine')} + 100₪ {t('administration fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('insurance waiver')}</h3>
          <p>{t('optional waiver to reduce the damage liability in case of an accident')}: 50₪ {t('per day')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('roadside assistance fee')}</h3>
          <p>{t('if roadside assistance is required due to user error or negligence, such as locking keys inside the vehicle or running out of fuel')}: 200₪ {t('per incident')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('wrong fuel charge')}</h3>
          <p>{t('if the car is filled with the wrong type of fuel')}: 500₪ {t('for draining and cleaning the fuel system')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('pet cleaning fee')}</h3>
          <p>{t('if the car requires additional cleaning due to pet hair or odors')}: 150₪ {t('standard cleaning fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('tire damage')}</h3>
          <p>{t('if tire damage occurs during the rental period')}: 400₪ {t('per tire')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('traffic violation fee')}</h3>
          <p>{t('any traffic violations incurred during the rental period are the responsibility of the user')} + 100₪ {t('administration fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('GPS tracking fee')}</h3>
          <p>{t('if the user attempts to disable the vehicle\'s GPS tracking device')}: 1000₪ {t('tampering fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('damage to exterior')}</h3>
          <p>{t('if the exterior of the car is damaged, including scratches, dents, or broken mirrors')}: 300₪ {t('for minor damage')} / {t('up to 1500₪ for major damage')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('lost parking card')}</h3>
          <p>{t('if the parking card is lost or damaged')}: 200₪ {t('replacement fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('car lockout fee')}</h3>
          <p>{t('if the user locks themselves out of the vehicle and requires assistance to unlock it')}: 150₪ {t('per incident')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('missing fuel card')}</h3>
          <p>{t('if the fuel card provided with the vehicle is lost or damaged')}: 100₪ {t('replacement fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('overnight parking fee')}</h3>
          <p>{t('if the car is parked in unauthorized areas overnight')} 50₪ {t('per night')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('unauthorized modifications')}</h3>
          <p>{t('if the user makes any unauthorized modifications or alterations to the vehicle')}: 1000₪ {t('plus repair costs')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('vehicle abandonment fee')}</h3>
          <p>{t('if the vehicle is abandoned at an unauthorized location or without proper notice')}: 1500₪ {t('recovery fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('wrong parking location')}</h3>
          <p>{t('if the car is parked in the wrong zone or location')} 200₪ {t('relocation fee')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('emergency towing')}</h3>
          <p>{t('if the car requires towing due to user negligence or misuse')}: 500₪ {t('plus additional towing fees')}</p>
        </div>

        <div className="charge-item">
          <h3>{t('unauthorized use of car')}</h3>
          <p>{t('if the car is used outside the terms of the rental agreement')} 1000₪ {t('penalty fee')}</p>
        </div>


      </div>
    </div>
  );
};

export default AdditionalCharges;