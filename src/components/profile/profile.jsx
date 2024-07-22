import React, { useEffect , useState } from "react";
import withOfflineOverlay from "../../assets/withOfflineOverlay";
import { auth } from '../../data/firebaseConfig';
import Swal from 'sweetalert2';
import EmailLogin from './emailLogin';
import GoogleLogin from './googleLogin';
import { useTranslation } from 'react-i18next';
import ProfileDetails from "./profileDetails";
import DeleteAccount from "./DeleteAccount";

const UserProfile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const {t} = useTranslation();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            text: 'You will be logged out from your account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                auth.signOut(); // התנתקות מהאימות של Firebase
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem('user'); // מחיקת פרטי המשתמש מה-LocalStorage
                Swal.fire('Logged out', 'You have been logged out successfully.', 'success');
            }
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); //LocalStorage -קבלת פרטי המשתמש גם מה
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div className="profile-page">
            {!isAuthenticated ? (
                <div className="profile-card">
                    <GoogleLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                    <EmailLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />

                </div>
            ) : (
                <>
                    <ProfileDetails user={user} />
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                    <DeleteAccount></DeleteAccount>
                </>
            )}
        </div>
    );

}
export default withOfflineOverlay(UserProfile);