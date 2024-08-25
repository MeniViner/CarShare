import React from 'react';
import { auth } from '../../data/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2';
import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
import '../../styles/login.css'
import { FcGoogle } from 'react-icons/fc';

import { getAuth } from "firebase/auth";


    const GoogleLogin = ({ setIsAuthenticated, setUser }) => {
    const auth = getAuth();
    const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in with Google!',
        timer: 1500,
        showConfirmButton: false,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Google login failed.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className='login-with-google-page'>
      <div className="profile-page-header">
        <MdAccountCircle className="icon" />
        <h1>Let's Connect</h1>
      </div>

      <div className='login-with-google'>
        <div className="separate">
          <div className="separate-line"></div>
            <h5>login with google</h5>
          <div className="separate-line"></div>
        </div>
        
        <button className="google-btn center-button" onClick={handleGoogleLogin}>
          <FcGoogle className="google-icon" />
          Login with Google
        </button>
        
      </div>
    </div>
  );
};

export default GoogleLogin;
