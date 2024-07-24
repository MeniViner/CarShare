import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AnimatedLink = ({ to, children, id }) => {
  const location = useLocation();
  
  return (
    <Link 
      to={{
        pathname: to,
        state: { fromRight: location.pathname === '/' && id === 'specialButton' }
      }}
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
