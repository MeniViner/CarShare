// import React, { useState } from 'react';
// import { t } from 'i18next';
// import { auth } from '../../data/firebaseConfig';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, updateProfile } from "firebase/auth";
// import { toast, ToastContainer } from 'react-toastify';
// import Swal from 'sweetalert2';
// import '../../styles/emailLogin.css';
// import 'react-toastify/dist/ReactToastify.css';

// const EmailLogin = ({ setIsAuthenticated, setUser }) => {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true); // true = login, false = register
//   const [isResetPassword, setIsResetPassword] = useState(false); // הגדרת state לשכחתי סיסמה
//   const [resetEmail, setResetEmail] = useState(''); // שדה מייל לשכחתי סיסמה

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let userCredential; // הגדרת משתנה מחוץ לתנאים

//       if (isLogin) {
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//         setUser(userCredential.user);
//         localStorage.setItem('user', JSON.stringify(userCredential.user));
//         Swal.fire(t('success'), t('logged in successfully'), 'success');
//       } else {
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         await updateProfile(userCredential.user, { displayName: name });
//         setUser(userCredential.user);
//         localStorage.setItem('user', JSON.stringify(userCredential.user));
//         Swal.fire(t('success'), t('registered successfully'), 'success');
//       }
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error(error);
//       if (error.code === 'auth/email-already-in-use') {
//         Swal.fire(t('error'), t('email already in use'), 'error');
//       } else if (error.code === 'auth/invalid-credential') {
//         Swal.fire(t('error'), t('invalid credential'), 'error');
//       } else {
//         Swal.fire(t('error'), error.message, 'error');
//       }
//     }
//   };

//   const handleResetPassword = async () => {
//     const auth = getAuth();
//     try {
//       await sendPasswordResetEmail(auth, resetEmail);
//       toast.success(t('A password reset email will be sent to the provided email address if it exists'));
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <ToastContainer />

//       <div className="separate-mail">
//         <div className="separate-line"></div>
//           <h5>{t('or login by email')}</h5>
//         <div className="separate-line"></div>
//       </div>

//       {!isResetPassword ? (
//         <form onSubmit={handleSubmit}>
//           <h2>{isLogin ? t('login') : t('register')}</h2>
//           {!isLogin && ( // הצגת שדה השם רק בעת הרשמה
//             <div className="g-input-container">
//               <input
//                 type="text"
//                 id="name"
//                 placeholder=" " 
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//               <label htmlFor="name">{t('full name')}</label>
//             </div>
//           )}
//           <div className="g-input-container">
//             <input
//               type="email"
//               id="email"
//               placeholder=" " 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <label htmlFor="email">{t('email address')}</label>
//           </div>
//           <div className="g-input-container">
//             <input
//               type="password"
//               id="password"
//               placeholder=" "
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <label htmlFor="password">{t('strong password')}</label>
//           </div>
//           <div className="login-forum-buttons">
//             <button type="submit" id='log-btn'>{isLogin ? t('login') : t('register')}</button>
//             {isLogin && 
//               <button 
//                 type="button" 
//                 onClick={() => setIsResetPassword(true)} 
//                 className="reset-password-button"
//               >
//                 <p>{t('forgot password')}?</p>
//               </button>
//             }
//           </div>
//           <p onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? t('need an account? register here') : t('already have an account? Sign in here')}
//           </p>
//         </form>
//       ) : (
//         <div className="reset-password-container">
//           <h2>{t('reset password')}</h2>
//           <div className="g-input-container">
//             <input
//               type="email"
//               id="resetEmail"
//               placeholder=" "
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               required
//             />
//             <label htmlFor="resetEmail">{t('enter your email')}</label>
//           </div>
//           <div className="login-forum-buttons">
//             <button 
//               onClick={handleResetPassword} 
//               className="reset-password-button"
//             >
//               {t('send reset email')}
//             </button>
//             <button 
//               onClick={() => setIsResetPassword(false)} 
//               className="reset-password-button"
//             >
//               {t('back to login')}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailLogin;











// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { auth } from '../../data/firebaseConfig';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
// import { toast, ToastContainer } from 'react-toastify';
// import Swal from 'sweetalert2';
// import '../../styles/emailLogin.css';
// import 'react-toastify/dist/ReactToastify.css';
// import { motion, AnimatePresence } from 'framer-motion';

// const EmailLogin = ({ setIsAuthenticated, setUser }) => {
//   const { t } = useTranslation();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const [isResetPassword, setIsResetPassword] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let userCredential;
//       if (isLogin) {
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         await updateProfile(userCredential.user, { displayName: name });
//       }
//       setUser(userCredential.user);
//       localStorage.setItem('user', JSON.stringify(userCredential.user));
//       Swal.fire(t('success'), isLogin ? t('logged in successfully') : t('registered successfully'), 'success');
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error(error);
//       Swal.fire(t('error'), t(error.code) || error.message, 'error');
//     }
//   };

//   const handleResetPassword = async () => {
//     try {
//       await sendPasswordResetEmail(auth, resetEmail);
//       toast.success(t('reset email sent'));
//       setIsResetPassword(false);
//     } catch (error) {
//       toast.error(t(error.code) || error.message);
//     }
//   };

//   const formVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
//   };

//   return (
//     <div className="login-container">
//       <ToastContainer />
//       <div className="separate-mail">
//         <div className="separate-line"></div>
//         <h5>{t('or login by email')}</h5>
//         <div className="separate-line"></div>
//       </div>
//       <AnimatePresence mode="wait">
//         {!isResetPassword ? (
//           <motion.form
//             key="loginForm"
//             variants={formVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             onSubmit={handleSubmit}
//           >
//             <h2>{isLogin ? t('login') : t('register')}</h2>
//             {!isLogin && (
//               <div className="g-input-container">
//                 <input
//                   type="text"
//                   id="name"
//                   placeholder=" "
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <label htmlFor="name">{t('full name')}</label>
//               </div>
//             )}
//             <div className="g-input-container">
//               <input
//                 type="email"
//                 id="email"
//                 placeholder=" "
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="email">{t('email address')}</label>
//             </div>
//             <div className="g-input-container">
//               <input
//                 type="password"
//                 id="password"
//                 placeholder=" "
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <label htmlFor="password">{t('password')}</label>
//             </div>
//             <div className="login-forum-buttons">
//               <motion.button
//                 type="submit"
//                 id='log-btn'
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {isLogin ? t('login') : t('register')}
//               </motion.button>
//             </div>
//             {isLogin && (
//               <motion.button
//                 type="button"
//                 className="forgot-password-button"
//                 onClick={() => setIsResetPassword(true)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {t('forgot password')}?
//               </motion.button>
//             )}
//             <motion.p
//               onClick={() => setIsLogin(!isLogin)}
//               whileHover={{ scale: 1.05 }}
//             >
//               {isLogin ? t('need an account? register here') : t('already have an account? Sign in here')}
//             </motion.p>
//           </motion.form>
//         ) : (
//           <motion.div
//             key="resetForm"
//             className="reset-password-container"
//             variants={formVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <h2>{t('reset password')}</h2>
//             <div className="g-input-container">
//               <input
//                 type="email"
//                 id="resetEmail"
//                 placeholder=" "
//                 value={resetEmail}
//                 onChange={(e) => setResetEmail(e.target.value)}
//                 required
//               />
//               <label htmlFor="resetEmail">{t('enter your email')}</label>
//             </div>
//             <div className="login-forum-buttons">
//               <motion.button
//                 onClick={handleResetPassword}
//                 className="reset-password-button"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {t('send reset email')}
//               </motion.button>
//               <motion.button
//                 onClick={() => setIsResetPassword(false)}
//                 className="back-to-login-button"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {t('back to login')}
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default EmailLogin;



















import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../../data/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import '../../styles/emailLogin.css';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const USER_CACHE_KEY = 'cachedUserInfo';

const EmailLogin = ({ setIsAuthenticated, setUser }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    const cachedUser = localStorage.getItem(USER_CACHE_KEY);
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      setUser(user);
      setIsAuthenticated(true);
    }
  }, [setUser, setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLogin && !isPasswordStrong(password)) {
        Swal.fire(t('error'), t('password must be at least 8 characters long and contain a mix of letters and numbers'), 'error');
        return;
      }

      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      const user = userCredential.user;
      setUser(user);
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
      Swal.fire(t('success'), isLogin ? t('logged in successfully') : t('registered successfully'), 'success');
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      Swal.fire(t('error'), getErrorMessage(error.code), 'error');
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success(t('reset email sent'));
      setIsResetPassword(false);
    } catch (error) {
      toast.error(getErrorMessage(error.code));
    }
  };

  const isPasswordStrong = (password) => {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return t('no user found with this email');
      case 'auth/wrong-password':
        return t('incorrect password');
      case 'auth/email-already-in-use':
        return t('email already in use');
      default:
        return t('an error occurred please try again');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="separate-mail">
        <div className="separate-line"></div>
        <h5>{t('or login by email')}</h5>
        <div className="separate-line"></div>
      </div>
      <AnimatePresence mode="wait">
        {!isResetPassword ? (
          <motion.form
            key="loginForm"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
          >
            <h2>{isLogin ? t('login') : t('register')}</h2>
            {!isLogin && (
              <div className="g-input-container">
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label={t('full name')}
                />
                <label htmlFor="name">{t('full name')}</label>
              </div>
            )}
            <div className="g-input-container">
              <input
                type="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label={t('email address')}
              />
              <label htmlFor="email">{t('email address')}</label>
            </div>
            <div className="g-input-container">
              <input
                type="password"
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label={t('password')}
              />
              <label htmlFor="password">{t('password')}</label>
            </div>
            <div className="login-forum-buttons">
              <motion.button
                type="submit"
                id='log-btn'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? t('login') : t('register')}
              </motion.button>
            </div>
            {isLogin && (
              <motion.button
                type="button"
                className="forgot-password-button"
                onClick={() => setIsResetPassword(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('forgot password')}?
              </motion.button>
            )}
            <motion.p
              onClick={() => setIsLogin(!isLogin)}
              whileHover={{ scale: 1.05 }}
            >
              {isLogin ? t('need an account? register here') : t('already have an account? Sign in here')}
            </motion.p>
          </motion.form>
        ) : (
          <motion.div
            key="resetForm"
            className="reset-password-container"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>{t('reset password')}</h2>
            <div className="g-input-container">
              <input
                type="email"
                id="resetEmail"
                placeholder=" "
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                aria-label={t('enter your email')}
              />
              <label htmlFor="resetEmail">{t('enter your email')}</label>
            </div>
            <div className="login-forum-buttons">
              <motion.button
                onClick={handleResetPassword}
                className="reset-password-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('send reset email')}
              </motion.button>
              <motion.button
                onClick={() => setIsResetPassword(false)}
                className="back-to-login-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('back to login')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailLogin;





// הוספנו `useEffect` לבדיקת מטמון המשתמש בטעינת הקומפוננטה.
// הוספנו פונקציה `isPasswordStrong` לבדיקת חוזק הסיסמה.
// הוספנו פונקציה `getErrorMessage` לטיפול טוב יותר בשגיאות ספציפיות.
// הוספנו מאפייני `aria-label` לשדות הקלט לשיפור הנגישות.
// עדכנו את הטיפול בשגיאות כך שיציג הודעות יותר ספציפיות למשתמש.