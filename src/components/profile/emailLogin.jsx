import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { auth } from '../../data/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const EmailLogin = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const action = e.target.name;

    try {
      if (action === 'Login') {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user); 
        Swal.fire({
          icon: 'success',
          title: 'Successfully logged in!',
          timer: 1500,
          showConfirmButton: false,
        });
        setIsAuthenticated(true);
      } else if (action === 'Register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user); 
        Swal.fire({
          icon: 'success',
          title: 'Successfully registered and logged in!',
          timer: 1500,
          showConfirmButton: false,
        });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: action === 'Login' ? 'Incorrect email or password.' : 'Registration failed.',
        showConfirmButton: true,
      });
    }
  };

  return (
      <form onSubmit={handleLogin}>
        {/* <h1>Admin Login</h1> */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" name="Login" />
        <input type="submit" value="Register" name="Register" />
      </form>
  );
};

export default EmailLogin;
