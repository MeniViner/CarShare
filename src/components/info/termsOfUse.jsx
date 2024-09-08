import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/termsOfUse.css';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-of-use-container">
      <h1>{t('terms of use')}</h1>
      <section>
        <h2>{t('1. acceptance of terms')}</h2>
        <p>{t('by accessing and using the car manager app, you agree to be bound by these terms of use')}</p>
      </section>
      <section>
        <h2>{t('2. user registration')}</h2>
        <p>{t('you must register for an account to use certain features of the app')}</p>
      </section>
      <section>
        <h2>{t('3. car rental terms')}</h2>
        <p>{t('all car rentals are subject to availability and our rental agreement')}</p>
      </section>
      <section>
        <h2>{t('4. payment and fees')}</h2>
        <p>{t('you agree to pay all fees associated with your use of the app and car rentals')}</p>
      </section>
      <section>
        <h2>{t('5. user responsibilities')}</h2>
        <p>{t('you are responsible for maintaining the confidentiality of your account')}</p>
      </section>
      <section>
        <h2>{t('6. prohibited activities')}</h2>
        <p>{t('you may not use the app for any illegal or unauthorized purpose')}</p>
      </section>
      <section>
        <h2>{t('7. privacy policy')}</h2>
        <p>{t('your use of the app is also governed by our privacy policy')}</p>
      </section>
      <section>
        <h2>{t('8. modifications to service')}</h2>
        <p>{t('we reserve the right to modify or discontinue the app at any time')}</p>
      </section>
      <section>
        <h2>{t('9. limitation of liability')}</h2>
        <p>{t('we are not liable for any indirect, incidental, or consequential damages')}</p>
      </section>
      <section>
        <h2>{t('10. governing law')}</h2>
        <p>{t('these terms are governed by the laws of the state/country where the app operates')}</p>
      </section>
    </div>
  );
};

export default TermsOfUse;