import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './map';
import Profile from './components/profile/profile'
import ListCars from './components/listCars';
// import Profile from './components/Profile';
// import Saved from './components/Saved';
// import Settings from './components/Settings';
import './style.css';
import Buttom from './components/buttom';
import Top from './components/top';


export default function App() {
    return (
        <Router>
            <div className='main-app'>
                <Top />
                <Routes>
                    <Route path="/" element={<Map />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/car-list" element={<ListCars />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* <Route path="/saved" element={<Saved />} /> */}
                    {/* <Route path="/settings" element={<Settings />} /> */}
                </Routes>
                <Buttom />
            </div>
        </Router>
    );
}
