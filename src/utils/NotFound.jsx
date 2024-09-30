import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';
import video404 from '../assets/404.mp4';

const NotFound = () => {
  return (
    <div className='page-404'>
      <h1>Car Share</h1>
      <h1 id="hmm" align="center">
        <b>Hmm... we can't find that!</b>
      </h1>
      <h2 id="top-info" align="center">
        The page you are looking for appears to be moved, deleted, or does not exist.
      </h2>
      <br />
      <video controls={false} loop autoPlay muted>
        <source src={video404} type="video/mp4" />
      </video>
      <h2 align="center">
        Visit our <Link id="h" to="/">Home Page</Link>.
      </h2>
    </div>
  );
};

export default NotFound;