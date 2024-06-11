import React, { useState } from 'react';
import { auth } from '../../data/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import '../../styles/emailLogin.css';

const EmailLogin = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        Swal.fire('Success', 'Logged in successfully', 'success');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        Swal.fire('Success', 'Registered successfully', 'success');
      }
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire('Error', 'Email already in use. Please log in instead.', 'error');
      } else if (error.code === 'auth/invalid-credential') {
        Swal.fire('Error', 'We checked and we can\'t recognize you.\n try register instead', 'error');
      } else {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register here.' : 'Have an account? Login here.'}
        </p>
      </form>
    </div>
  );
};

export default EmailLogin;
