import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/termsOfUse.css';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-of-use-container">
      <h1>{t('terms of use')}</h1>
      <section>
        <h2>{t('1. acceptance of terms')}</h2>
        <p>{t('by accessing and using the CarShare app, you agree to be bound by these terms of use')}</p>
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
      <section>
        <h2>{t('11. termination')}</h2>
        <p>{t('we reserve the right to suspend or terminate your account if you violate these terms of use')}</p>
      </section>
      <section>
        <h2>{t('12. indemnification')}</h2>
        <p>{t('you agree to indemnify and hold us harmless from any claims arising from your use of the app')}</p>
      </section>
      <section>
        <h2>{t('13. third-party services')}</h2>
        <p>{t('the app may include services or content provided by third parties. we are not responsible for these services')}</p>
      </section>
      <section>
        <h2>{t('14. entire agreement')}</h2>
        <p>{t('these terms constitute the entire agreement between you and us regarding your use of the app')}</p>
      </section>
      <section>
        <h2>{t('15. severability')}</h2>
        <p>{t('if any part of these terms is found invalid, the remaining provisions will continue in full force and effect')}</p>
      </section>
      <section>
        <h2>{t('16. waiver')}</h2>
        <p>{t('our failure to enforce any right or provision of these terms will not constitute a waiver of such right')}</p>
      </section>
      <section>
        <h2>{t('17. contact information')}</h2>
        <p>{t('if you have any questions about these terms, please contact us at meniviner@gmail.com')}</p>
      </section>
      {/* //it is not a real app terms*/}
      <section>
        <h2>{t('18. non-commercial use')}</h2>
        <p>{t('this app is intended solely for personal and internal use and is not designed for commercial or production environments')}</p>
      </section>
      <section>
        <h2>{t('19. no warranties')}</h2>
        <p>{t('the app is provided as-is without any warranties, express or implied, and is not intended for public or commercial deployment')}</p>
      </section>
      <section>
        <h2>{t('20. internal testing')}</h2>
        <p>{t('this project is in an internal testing phase and is used for educational or personal purposes only')}</p>
      </section>
      <section>
        <h2>{t('21. limitations of usage')}</h2>
        <p>{t('use of this app for any production or commercial purpose is strictly prohibited. it is designed for personal project development and learning purposes only')}</p>
      </section>
    </div>
  );
};

export default TermsOfUse;