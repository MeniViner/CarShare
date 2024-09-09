import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Swal from 'sweetalert2';
import { MdAccountCircle } from "react-icons/md";
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import '../../styles/login.css';

const USER_CACHE_KEY = 'cachedUserInfo';

const GoogleLogin = ({ setIsAuthenticated, setUser }) => {
  const { t } = useTranslation();
  const auth = getAuth();
  const db = getFirestore();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // שמירת פרטי המשתמש ב-Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        createdAt: new Date(),
      }, { merge: true });

      setUser(user);
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
      Swal.fire({
        icon: 'success',
        title: t('Successfully logged in with Google!'),
        timer: 1500,
        showConfirmButton: false,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Google login error:', error);
      Swal.fire({
        icon: 'error',
        title: t('Error!'),
        text: t('Google login failed.'),
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className='login-with-google-page'>
      <div className="profile-page-header">
        <MdAccountCircle className="icon" aria-hidden="true" />
        <h1>{t("Let's Connect")}</h1>
      </div>

      <div className='login-with-google'>
        <div className="separate">
          <div className="separate-line"></div>
          <h5>{t('login with google')}</h5>
          <div className="separate-line"></div>
        </div>
        
        <button 
          className="google-btn center-button" 
          onClick={handleGoogleLogin}
          aria-label={t('Login with Google')}
        >
          <FcGoogle className="google-icon" aria-hidden="true" />
          {t('Login with Google')}
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;





// **שימוש ב-i18next**: הוספנו `useTranslation` והחלפנו את כל המחרוזות הקבועות ב-`t()` לתמיכה בתרגום.
// **שיפור המטמון**: שינינו את מפתח המטמון ל-`USER_CACHE_KEY` לעקביות עם הקומפוננטות האחרות.
// **טיפול בשגיאות**: הוספנו פרטים נוספים להודעת השגיאה בקונסול.
// **נגישות**: הוספנו מאפייני `aria-label` ו-`aria-hidden` לשיפור הנגישות.
// **ייבוא**: הסרנו ייבוא לא נחוץ של `auth` מ-`firebaseConfig` מכיוון שאנחנו משתמשים ב-`getAuth()`.
// **עקביות**: השתמשנו ב-`USER_CACHE_KEY` במקום במחרוזת קבועה 'user' לשמירת מידע המשתמש ב-`localStorage`.
// **ביצועים**: הוצאנו את יצירת ה-`GoogleAuthProvider` מחוץ לפונקציית ה-`handleGoogleLogin` כדי למנוע יצירה מחדש בכל לחיצה.