import React, { useEffect , useState } from "react";
import { auth } from '../../data/firebaseConfig';

import EmailLogin from './emailLogin';
import GoogleLogin from './googleLogin';

const UserProfile = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

        // פונקציה לטיפול בהתנתקות
    const handleLogout = () => {
        auth.signOut(); // התנתקות מהאימות של Firebase
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user'); // מחיקת פרטי המשתמש מה-LocalStorage
    };
  

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
    }, []);

    return (
        <>
            <div className="profile-page">
                {!isAuthenticated ? (
                    <div>
                        <h4>hi new user</h4>
                        <EmailLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                        <GoogleLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                    </div>
                ) : (
                    <div>Welcome {user?.displayName || user?.email}!</div>
                )}
                                
                {isAuthenticated && (
                <button onClick={handleLogout}>Logout</button>
                )}

            </div>

            {/* <h1>Wellcome {userName} </h1> */}
        </>
    );
}

export default UserProfile;