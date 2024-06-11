import React from 'react';
import { auth } from '../../data/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2';
import '../../styles/login.css'
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = ({ setIsAuthenticated, setUser }) => {
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
    <>
      <div className="separate">
          <div className="separate-line"></div>
            <h5>or login with google</h5>
          <div className="separate-line"></div>
      </div>
      
      <button className="google-btn" onClick={handleGoogleLogin}>
        <FcGoogle className="google-icon" />
        Login with Google
      </button>
    </>
  );
};

export default GoogleLogin;
