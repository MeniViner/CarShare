import React, { useEffect , useState } from "react";
import EmailLogin from './emailLogin';
import GoogleLogin from './googleLogin';

const UserProfile = () => {


    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
    }, []);

    return (
        <>
            <div>
                {!isAuthenticated ? (
                    <div>
                        <h4>hi new user</h4>
                        <EmailLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                        <GoogleLogin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                    </div>
                ) : (
                    <div>Welcome {user?.displayName || user?.email}!</div>
                )}
            </div>

            {/* <h1>Wellcome {userName} </h1> */}
        </>
    );
}

export default UserProfile;