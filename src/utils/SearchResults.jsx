// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Fuse from 'fuse.js';
// import cars from '../data/carsData';
// import '../styles/SearchResults.css'; 

// const SearchResults = () => {
//   const navigate = useNavigate();
//   const query = new URLSearchParams(useLocation().search).get('q');

//   const data = [
//     { name: 'Map', path: '/map', content: 'Map page content' },
//     { name: 'Profile', path: '/profile', content: 'Profile page content' },
//     { name: 'Car List', path: '/car-list', content: 'Car list page content' },
//     { name: 'Saved', path: '/saved', content: 'Saved cars and preferences' },
//     { name: 'Settings', path: '/settings', content: 'Settings page content' },
//     ...cars.map(car => ({ id: car.id, name: `${car.brand} ${car.model}`, path: `/map?carId=${car.id}`, content: car.description })),
//     // ניתן להוסיף כאן דפים נוספים ותוכן חיפוש
//   ];

//   const fuse = new Fuse(data, {
//     keys: ['name', 'content'],
//     threshold: 0.1, // סף דיוק החיפוש Scaled from 0.1 to 1 - 0.1 being the most accurate.
//   });

//   const results = fuse.search(query);

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="search-results">
//       <h1>Search Results</h1>
//       <p className="search-query">found {results.length} results for: <strong>{query}</strong></p>
//       {results.length > 0 ? (
//         <div className="results-list">
//           {results.map(result => (
//             <div key={result.item.id} className="result-item" onClick={() => handleNavigate(result.item.path)}>
//               <h2>{result.item.name}</h2>
//               <p>{result.item.content}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-results">No results found</p>
//       )}
//     </div>
//   );
// };

// export default SearchResults;

















import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebaseConfig';
import { useTranslation } from 'react-i18next';
import { fetchCarsFromFirebase } from '../data/fetchCars';
import LoadingPage from '../assets/LoadingPage';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const staticData = [
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
  ];

  const fetchSearchData = useCallback(async () => {
    try {
      const cars = await fetchCarsFromFirebase();
      const carData = cars.map(car => ({
        id: car.id,
        name: `${car.brand} ${car.model}`,
        path: `/map?carId=${car.id}`,
        content: `${car.description} - ${car.year} - ${car.fuelType} - ${car.seats} ${t('seats')} - ${car.pricePerHour}₪/${t('hour')} - ${car.pricePerDay}₪/${t('day')}`,
        type: 'car'
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
        keys: ['name', 'content'],
        threshold: 0.3,
        includeScore: true
      });

      const results = fuse.search(query);
      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching search data:', error);
      setIsLoading(false);
    }
  }, [query, t]);

  useEffect(() => {
    fetchSearchData();
  }, [fetchSearchData]);

  const handleNavigate = (path) => {
    navigate(path);
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
              onClick={() => handleNavigate(result.item.path)}
            >
              <h2>{result.item.name}</h2>
              <p>{result.item.content}</p>
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


// נוספו ערכים סטטיים נוספים עבור דפים ותכונות שונות של האפליקציה שלך.
// הטמיע אחזור נתונים דינמי עבור מכוניות והזמנות באמצעות Firebase.
// השתמש בפונקציה 'fetchCarsFromFirebase' כדי לקבל את נתוני הרכב העדכניים ביותר.
// הוסיפו נתוני הזמנות לתוצאות החיפוש, מאחזרים מאוסף 'הזמנות' ב-Firestore.
// סיווג תוצאות חיפוש על ידי הוספת שדה 'סוג' (לדוגמה, 'מכונית', 'הזמנה').
// שיפור תצורת Fuse.js לדיוק חיפוש טוב יותר.
// הוטמע מצב טעינה עם רכיב LoadingPage.
// השתמשו ב-react-i18next לתמיכה בבינאום.
// שיפר את ממשק המשתמש כדי להציג סוגי תוצאות (מכונית או הזמנה) ושיפור הסגנון.
// ביצועים אופטימליים באמצעות 'useCallback' ו-'useEffect'.