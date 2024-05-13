import React from 'react';
import Login from './login';

const Profile = ({userName}) => {

    return (
        <>
            <div className="user-profile">
                <h1> profile page </h1>
                {/* <h1>Wellcome back {userName} </h1> */}
                <Login/>
            </div>    
        </>
    );
};

export default Profile;