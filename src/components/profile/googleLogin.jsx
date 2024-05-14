import React from 'react';
import '../../styles/login.css'


const GoogleLogin = ({userName}) => {

    return (
        <>
           <div className="small-container">
           <div className="separate">
                <div className="separate-line"></div>
                    <h5>or login with google</h5>
                <div className="separate-line"></div>
            </div>
           </div>
        </>
    );
};

export default GoogleLogin;