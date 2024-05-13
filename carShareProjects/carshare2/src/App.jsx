import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './map';
import './style.css';
import Buttom from './components/buttom';
import Top from './components/top';

export default function App() {
  return (

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Map/>}/>
    //     <Route path="/buttom" element={<Buttom/>}/>
    //   </Routes>
    // </Router>
    
    <div className='main-app'>
      <Top/>
      <Map/>
      {/* <Top/> */}
      {/* <SideNavigation/> */}
      {/* <Login></Login> */}
      {/* <LocationButton/> */}
      <Buttom/>
    </div>
  );
}
