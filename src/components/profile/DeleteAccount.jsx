// import React from 'react';
// import { t } from 'i18next';
// import { useNavigate } from 'react-router-dom';
// import { deleteUser } from "firebase/auth";
// import { doc, deleteDoc } from "firebase/firestore";
// import { auth, db } from '../../data/firebaseConfig'; // ייבוא האותנטיקציה מ-Firebase
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import '../../styles/DeleteAccount.css'; // ייבוא קובץ ה-CSS

// const DeleteAccount = () => {
//   const navigate = useNavigate();

//   const deleteAccount = async () => {
//     const user = auth.currentUser;

//     if (user) {
//       const result = await Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       });

//       if (result.isConfirmed) {
//         try {
//           // מחיקת פרטי המשתמש מה-Firestore
//           await deleteDoc(doc(db, "users", user.uid));
//           // מחיקת חשבון המשתמש מ-Firebase Authentication
//           await deleteUser(user);
//           toast.success('Your account has been successfully deleted.');
//           navigate('/'); // ניתוב לדף הבית לאחר המחיקה
//         } catch (error) {
//           console.error('Error deleting user:', error);
//           toast.error('Failed to delete your account. Please try again later.');
//         }
//       }
//     } else {
//       toast.error('No user is currently signed in.');
//     }
//   };

//   return (
//     <div className="delete-account">
//       <ToastContainer />
//       <button onClick={deleteAccount} className="delete-account-button">{t('delete my account')}</button>
//     </div>
//   );
// };

// export default DeleteAccount;




// import React from 'react';
// import { t } from 'i18next';
// import { useNavigate } from 'react-router-dom';
// import { deleteUser, PhoneAuthProvider, reauthenticateWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import { doc, deleteDoc } from "firebase/firestore";
// import { auth, db } from '../../data/firebaseConfig'; // Import Firebase auth and Firestore
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import '../../styles/DeleteAccount.css'; // Import the CSS file

// const DeleteAccount = () => {
//   const navigate = useNavigate();

//   const deleteAccount = async () => {
//     const user = auth.currentUser;

//     if (user) {
//       try {
//         // Step 1: Set up reCAPTCHA verifier
//         const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//           'size': 'invisible',
//           'callback': (response) => {
//             // reCAPTCHA solved, allow account deletion process
//           }
//         }, auth);

//         // Step 2: Get user's phone number or prompt if not available
//         let phoneNumber = user.phoneNumber;
//         if (!phoneNumber) {
//           phoneNumber = window.prompt("Please enter your phone number for SMS verification:");
//           if (!phoneNumber) throw new Error("Phone number is required for SMS verification.");
//         }

//         // Step 3: Send SMS verification for reauthentication
//         const appVerifier = recaptchaVerifier;
//         const provider = new PhoneAuthProvider(auth);
//         const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);

//         // Step 4: Prompt user to enter SMS verification code
//         const verificationCode = window.prompt('Please enter the verification code that was sent to your phone:');
//         if (!verificationCode) throw new Error("Verification code is required.");

//         const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

//         // Step 5: Reauthenticate the user with the phone credential
//         await user.reauthenticateWithCredential(credential);

//         // Step 6: Confirm account deletion
//         const result = await Swal.fire({
//           title: 'Are you sure?',
//           text: "You won't be able to revert this!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes, delete it!'
//         });

//         if (result.isConfirmed) {
//           // Delete user data from Firestore
//           await deleteDoc(doc(db, "users", user.uid));
//           // Delete user account from Firebase Authentication
//           await deleteUser(user);
//           toast.success('Your account has been successfully deleted.');
//           navigate('/'); // Navigate to home page after deletion
//         }
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         toast.error('Failed to delete your account. Please try again later.');
//       }
//     } else {
//       toast.error('No user is currently signed in.');
//     }
//   };

//   return (
//     <div className="delete-account">
//       <ToastContainer />
//       {/* reCAPTCHA container */}
//       <div id="recaptcha-container"></div>
//       <button onClick={deleteAccount} className="delete-account-button">
//         {t('delete my account')}
//       </button>
//     </div>
//   );
// };

// export default DeleteAccount;

















import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { deleteUser, PhoneAuthProvider, reauthenticateWithCredential, RecaptchaVerifier } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../data/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import '../../styles/DeleteAccount.css';

const DeleteAccount = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const clearAllLocalStorage = () => {
    localStorage.clear();
  };

  const deleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow account deletion process
          }
        }, auth);

        let phoneNumber = user.phoneNumber;
        if (!phoneNumber) {
          phoneNumber = window.prompt(t("Please enter your phone number for SMS verification:"));
          if (!phoneNumber) throw new Error(t("Phone number is required for SMS verification."));
        }

        const appVerifier = recaptchaVerifier;
        const provider = new PhoneAuthProvider(auth);
        const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);

        const verificationCode = window.prompt(t('Please enter the verification code that was sent to your phone:'));
        if (!verificationCode) throw new Error(t("Verification code is required."));

        const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

        await reauthenticateWithCredential(user, credential);

        const result = await Swal.fire({
          title: t('Are you sure?'),
          text: t("You won't be able to revert this!"),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: t('Yes, delete it!')
        });

        if (result.isConfirmed) {
          await deleteDoc(doc(db, "users", user.uid));
          await deleteUser(user);
          clearAllLocalStorage();
          toast.success(t('Your account has been successfully deleted.'));
          navigate('/');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.code === 'auth/requires-recent-login') {
          toast.error(t('For security reasons, please log out and log in again before deleting your account.'));
        } else {
          toast.error(t('Failed to delete your account. Please try again later.'));
        }
      }
    } else {
      toast.error(t('No user is currently signed in.'));
    }
  };

  return (
    <div className="delete-account">
      <ToastContainer />
      <div id="recaptcha-container"></div>
      <button onClick={deleteAccount} className="delete-account-button">
        {t('delete my account')}
      </button>
    </div>
  );
};

export default DeleteAccount;