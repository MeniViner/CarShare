import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchResults from './utils/SearchResults';
import Map from './pages/map';
import Profile from './components/profile/profile'
import ListCars from './components/listCars';
import Saved from './pages/saved';
import Settings from './pages/settings';
import Top from './components/top';
import NotFound from './utils/NotFound'; 
import EditProfile from './components/profile/EditProfile';
import Prices from './components/info/prices/prices';
import ContactForm from './pages/Contact';
import Reservations from './pages/reservations';
import CarManager from './components/CarManager';
import TermsOfUse from './components/info/termsOfUse';
// import UploadCars from './data/UploadCars';


export default function App() {
    return (
        <Router>
            <div className='main-app'>
                <Top />
                <Routes>
                    {/* <UploadCars /> */}
                    <Route path='edit-profile' element={<EditProfile />} />

                    <Route path="/" element={<Map />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/my-reservations" element={<Reservations />} />
                    <Route path="/car-list" element={<ListCars />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path='/contact-info' element={<ContactForm />} />
                    <Route path='/manage' element={<CarManager />} />
                    <Route path="/utils/SearchResults" element={<SearchResults />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                </Routes>
            </div>
        </Router>
    );
}
