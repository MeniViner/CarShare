import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../../data/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';
import '../../styles/emailLogin.css';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

const EmailLogin = ({ setIsAuthenticated, setUser }) => {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register
  const [isResetPassword, setIsResetPassword] = useState(false); // הגדרת state לשכחתי סיסמה
  const [resetEmail, setResetEmail] = useState(''); // שדה מייל לשכחתי סיסמה

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userCredential; // הגדרת משתנה מחוץ לתנאים

      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        Swal.fire('Success', 'Logged in successfully', 'success');
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        setUser(userCredential.user);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        Swal.fire('Success', 'Registered successfully', 'success');
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire('Error', 'Email already in use. Please log in instead.', 'error');
      } else if (error.code === 'auth/invalid-credential') {
        Swal.fire('Error', 'We checked and we can\'t recognize you.\n try register instead', 'error');
      } else {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('if the email');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />

      <div className="separate-mail">
        <div className="separate-line"></div>
          <h5>or login by email</h5>
        <div className="separate-line"></div>
      </div>

      {!isResetPassword ? (
        <form onSubmit={handleSubmit}>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          {!isLogin && ( // הצגת שדה השם רק בעת הרשמה
            <div className="input-container">
              <input
                type="text"
                id="name"
                placeholder=" " 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">{t('full-name')}</label>
            </div>
          )}
          <div className="input-container">
            <input
              type="email"
              id="email"
              placeholder=" " 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">{t('email-address')}</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">{t('strong-password')}</label>
          </div>
          <div className="login-forum-buttons">
            <button type="submit" id='log-btn'>{isLogin ? 'Login' : 'Register'}</button>
            {isLogin && 
              <button 
                type="button" 
                onClick={() => setIsResetPassword(true)} 
                className="reset-password-button"
              >
                Forgot Password?
              </button>
            }
          </div>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Register here.' : 'Have an account? Login here.'}
          </p>
        </form>
      ) : (
        <div className="reset-password-container">
          <h2>Reset Password</h2>
          <div className="input-container">
            <input
              type="email"
              id="resetEmail"
              placeholder=" "
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <label htmlFor="resetEmail">Enter your email</label>
          </div>
          <div className="login-forum-buttons">
            <button onClick={handleResetPassword} className="reset-password-button">Send Reset Email</button>
            <button onClick={() => setIsResetPassword(false)} className="reset-password-button">Back to Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailLogin;
