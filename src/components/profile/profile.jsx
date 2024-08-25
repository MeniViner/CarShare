// import React, { useEffect , useState } from "react";
// import withOfflineOverlay from "../../assets/withOfflineOverlay";
// import { auth } from '../../data/firebaseConfig';
// import Swal from 'sweetalert2';
// import EmailLogin from './emailLogin';
// import GoogleLogin from './googleLogin';
// import { useTranslation } from 'react-i18next';
// import ProfileDetails from "./profileDetails";
// import DeleteAccount from "./DeleteAccount";

// const UserProfile = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const {t} = useTranslation();

//     const handleLogout = () => {
//         Swal.fire({
//             title: 'Are you sure you want to logout?',
//             text: 'You will be logged out from your account.',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Logout',
//             cancelButtonText: 'Cancel',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 auth.signOut(); // התנתקות מהאימות של Firebase
//                 setIsAuthenticated(false);
//                 setUser(null);
//                 localStorage.removeItem('user'); // מחיקת פרטי המשתמש מה-LocalStorage
//                 Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
//             }
//         });
//     };

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user'); //LocalStorage -קבלת פרטי המשתמש גם מה
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//             setIsAuthenticated(true);
//         }
//     }, []);

//     return (
//         <div className="profile-page">
//             {!isAuthenticated ? (
//                 <div className="profile-card">
//                     <GoogleLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
//                     <EmailLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />

//                 </div>
//             ) : (
//                 <>
//                     <ProfileDetails user={user} />
//                     <button className="logout-button" onClick={handleLogout}>Logout</button>
//                     <DeleteAccount></DeleteAccount>
//                 </>
//             )}
//         </div>
//     );

// }
// export default withOfflineOverlay(UserProfile);







import React, { useEffect, useState } from "react";
import withOfflineOverlay from "../../assets/withOfflineOverlay";
import { auth } from '../../data/firebaseConfig';
import Swal from 'sweetalert2';
import EmailLogin from './emailLogin';
import GoogleLogin from './googleLogin';
import { useTranslation } from 'react-i18next';
import ProfileDetails from "./profileDetails";
import DeleteAccount from "./DeleteAccount";
import { motion } from "framer-motion";
import '../../styles/userProfile.css';

const UserProfile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const { t } = useTranslation();

    const handleLogout = () => {
        Swal.fire({
            title: t('logout confirmation title'),
            text: t('logout confirmation text'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('logout'),
            cancelButtonText: t('cancel'),
        }).then((result) => {
            if (result.isConfirmed) {
                auth.signOut();
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem('user');
                Swal.fire(t('logged out'), t('logged out success'), 'success');
            }
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div className="profile-container-page">
        <motion.div 
            className="profile-page"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {!isAuthenticated ? (
                <motion.div 
                    className="profile-card"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <GoogleLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                    <div className="divider">{t('or')}</div>
                    <EmailLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                </motion.div>
            ) : (
                <>
                    <ProfileDetails user={user} />
                    <motion.button 
                        className="logout-button" 
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('logout')}
                    </motion.button>
                    <DeleteAccount />
                </>
            )}
        </motion.div>
        </div>
    );
}

export default withOfflineOverlay(UserProfile);