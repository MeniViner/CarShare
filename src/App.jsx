import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchResults from './utils/SearchResults'; // ייבוא רכיב החיפוש

import Map from './components/map';
import Profile from './components/profile/profile'
import ListCars from './components/listCars';
import Saved from './components/saved';
import Settings from './components/settings';
import Top from './components/top';
import NotFound from './components/NotFound'; 
import EditProfile from './components/profile/EditProfile';
import Prices from './components/info/prices/prices';


export default function App() {
    return (
        <Router>
            <div className='main-app'>
                <Top />
                <Routes>
                    <Route path='edit-profile' element={<EditProfile />} />

                    <Route path="/" element={<Map />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/car-list" element={<ListCars />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/utils/SearchResults" element={<SearchResults />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                </Routes>
            </div>
        </Router>
    );
}
