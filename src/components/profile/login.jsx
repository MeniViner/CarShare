import React from 'react';
import EmailLogin from './emailLogin';
import GoogleLogin from './googleLogin';


const Login = ({userName}) => {

    return (
        <>
            <div className="user-login">
                <h1> login page </h1>
                <EmailLogin/>
                
                <GoogleLogin/>
            </div>    
        </>
    );
};

export default Login;