import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './map';
import Profile from './components/profile/profile'
import ListCars from './components/listCars';
import Saved from './components/saved';
import Settings from './components/settings';
import './style.css';
import Buttom from './components/buttom';
import Top from './components/top';
import NotFound from './components/NotFound'; 


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
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                </Routes>
                <Buttom />
            </div>
        </Router>
    );
}
