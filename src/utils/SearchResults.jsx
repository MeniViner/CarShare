import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';

import { db, auth } from '../data/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { fetchCarsFromFirebase } from '../data/fetchCars';

import LoadingPage from '../assets/LoadingPage';
import Swal from 'sweetalert2';
import '../styles/SearchResults.css';


const SearchResults = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const staticData = useMemo(() => [
    { 
      name: t('map'), 
      path: '/map', 
      content: t('interactive map to find and rent cars near you'),
      type: 'page'
    },
    { 
      name: t('profile'), 
      path: '/profile', 
      content: t('manage your personal information, view rental history, and update account settings'),
      type: 'page'
    },
    { 
      name: t('car list'), 
      path: '/car-list', 
      content: t('browse all available cars, filter by type, price, and features'),
      type: 'page'
    },
    { 
      name: t('saved'), 
      path: '/saved', 
      content: t('view and manage your saved cars and preferences'),
      type: 'page'
    },
    { 
      name: t('settings'), 
      path: '/settings', 
      content: t('adjust app settings including language, theme, notifications, and font size'),
      type: 'page'
    },
    { 
      name: t('language settings'), 
      path: '/settings#language', 
      content: t('change application language (English, Hebrew)'),
      type: 'setting'
    },
    { 
      name: t('theme settings'), 
      path: '/settings#theme', 
      content: t('switch between light and dark mode'),
      type: 'setting'
    },
    { 
      name: t('font size settings'), 
      path: '/settings#font-size', 
      content: t('adjust text size (small, medium, large)'),
      type: 'setting'
    },
    { 
      name: t('reservations'), 
      path: '/my-reservations', 
      content: t('view active reservations, reservation history, and manage bookings'),
      type: 'page'
    },
    { 
      name: t('contact'), 
      path: '/contact-info', 
      content: t('get in touch with customer support, view FAQ, and find help resources'),
      type: 'page'
    },
    { 
      name: t('prices'), 
      path: '/prices', 
      content: t('view pricing information, special offers, and loyalty programs'),
      type: 'page'
    },
  ], [t]);

  const fetchSearchData = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) {
      Swal.fire({
        title: t('log in'),
        text: t('Please log in to use the search feature.'),
        icon: 'warning',
        timer: 4000,
      });
      navigate('/profile');
      return;
    }

    try {
      const cars = await fetchCarsFromFirebase();
      const carData = cars.map(car => ({
        id: car.id,
        name: `${car.brand} ${car.model} ${car.year}`,
        path: `/map?carId=${car.id}`,
        content: `
          ${car.year} • ${car.fuelType} • ${car.seats} ${t('seats')} • 
          ${car.pricePerHour}₪/${t('hour')} • ${car.pricePerDay}₪/${t('day')} • 
          ${t('unlock fee')}: ${car.unlockFee}₪ • ${t('price per km')}: ${car.kmPrice}₪ • 
          ${t('fuel')}: ${car.fuelType === 'Electric' ? `${t('battery')}: ${car.battery}` : car.fuel} • 
        `,
        type: 'car',
        category: car.category,
        brand: car.brand,
        model: car.model,
        seats: car.seats,
        year: car.year,
        pricePerHour: car.pricePerHour,
        pricePerDay: car.pricePerDay,
        unlockFee: car.unlockFee,
        kmPrice: car.kmPrice,
        fuelType: car.fuelType,
        fuel: car.fuel,
        battery: car.battery,
        image3: car.image3,
        address: car.address,
      }));

      const reservationsSnapshot = await getDocs(collection(db, 'reservations'));
      const reservationsData = reservationsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: `${t('reservation')}: ${data.carId}`,
          path: `/my-reservations#${doc.id}`,
          content: `${t('from')} ${data.startDate} ${t('to')} ${data.endDate} - ${t('total cost')}: ${data.totalCost}₪`,
          type: 'reservation'
        };
      });

      const allData = [...staticData, ...carData, ...reservationsData];

      const fuse = new Fuse(allData, {
        keys: ['name', 'content', 'category', 'brand', 'model', 'address.city', 'address.street'],
        threshold: 0.3, //יחסית נמוך
        includeScore: true
      });

      const results = fuse.search(query);
      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching search data:', error);
      setIsLoading(false);
    }
  }, [query, t, navigate, staticData]);

  useEffect(() => {
    fetchSearchData();
  }, [fetchSearchData]);

  const handleNavigate = (path, type, id) => {
    if (type === 'car') {
      navigate(`/map?carId=${id}`);
    } else {
      navigate(path);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="search-results">
      <h1>{t('search results')}</h1>
      <p className="search-query">
        {t('found results', { count: searchResults.length, query: query })}
      </p>
      {searchResults.length > 0 ? (
        <div className="results-list">
          {searchResults.map((result) => (
            <div
              key={result.item.id || result.item.path}
              className={`result-item ${result.item.type}`}
              onClick={() => handleNavigate(result.item.path, result.item.type, result.item.id)}
            >
              <h2>{result.item.name}</h2>
              <p>{result.item.content}</p>
              {result.item.type === 'car' && (
                <div className="car-details">
                  <img src={result.item.image3} alt={result.item.name} className="car-thumbnail" />
                  <p>{t('category')}: {result.item.category}</p>
                  <p>{t('location')}: {result.item.address.city}, {result.item.address.street}</p>
                </div>
              )}
              <span className="result-type">{t(result.item.type)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">{t('no results found')}</p>
      )}
    </div>
  );
};

export default SearchResults;
