import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './components/map';
import './style.css';


export default function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Map/>}/>
      </Routes>
    </Router>

    // <div className='main-app'>
    //   <Map/>
    //   {/* <Top/> */}
    //   {/* <SideNavigation/> */}
    //   {/* <Login></Login> */}
    //   {/* <LocationButton/> */}
    //   {/* <Buttom/> */}
    // </div>
  );
}
