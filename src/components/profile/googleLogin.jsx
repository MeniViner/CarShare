import React, { useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false); 

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);

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
      if (error.code === 'auth/popup-closed-by-user') {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'The popup was closed before completing the sign in. Please try again.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: `An error occurred: ${error.message}`,
        });
      }
    } finally {
      setIsLoading(false);
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
        
        {isLoading ? (
          <div className="loading-indicator">
            <p>{t('Connecting to Google, please wait...')}</p>
            <div className="spinner"></div>
          </div>
        ) : (
          <button 
            className="google-btn center-button" 
            onClick={handleGoogleLogin}
            aria-label={t('Login with Google')}
          >
            <FcGoogle className="google-icon" aria-hidden="true" />
            {t('Login with Google')}
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleLogin;

