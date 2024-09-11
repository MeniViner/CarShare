// // import React, {useState, useEffect } from 'react';
// // import { t } from 'i18next';
// // import { Link } from 'react-router-dom';
// // import { useLocation } from 'react-router-dom';
// // import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
// // // import { AdvancedMarkerElement } from '@googlemaps/markerclusterer';

// // import cars from '../data/carsData';
// // import dayMapStyles from '../assets/dayMapStyles';
// // import nightMapStyles from '../assets/nightMapStyles';
// // import { TbCurrentLocation } from "react-icons/tb";
// // import CarInfoWindow from '../components/infoWindow'; 
// // import LoadingPage from '../assets/LoadingPage';
// // import withOfflineOverlay from '../assets/withOfflineOverlay';
// // import '../styles/map.css';
// // import { IoListSharp } from 'react-icons/io5';

// // import miniCarIcon from '../images/mini-car.svg';
// // import familyCarIcon from '../images/family-car-icon.svg';
// // import businessCarIcon from '../images/business-car-icon.svg';
// // import suvCarIcon from '../images/suv-car-icon.svg';


// // const Map = () => {
// //   const location = useLocation(); 
// //   const [selectedCar, setSelectedCar] = useState(null);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
// //   const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
// //   // const [isDarkMode, setIsDarkMode] = useState(() => {
// //   const isDarkMode = useState(() => {
// //     // טען את מצב הנושא מ-localStorage אם קיים
// //     const savedTheme = localStorage.getItem('theme');
// //     return savedTheme ? savedTheme === 'dark' : false;
// //   });
// //   const [isLocationSet, setIsLocationSet] = useState(false); // ניהול מצב האם מיקום שמור

// //   useEffect(() => {
// //     const storedLocation = localStorage.getItem('userLocation');
// //     if (storedLocation) {
// //       const parsedLocation = JSON.parse(storedLocation);
// //       setUserLocation(parsedLocation);
// //       setMapCenter(parsedLocation);
// //       setIsLocationSet(true); // עדכון המצב אם יש מיקום שמור
// //     }


// //     // בדוק אם יש פרמטר carId ב-URL
// //     const searchParams = new URLSearchParams(location.search);
// //     const carId = searchParams.get('carId');
// //     if (carId) {
// //       const car = cars.find(c => c.id === parseInt(carId));
// //       if (car) {
// //         setSelectedCar(car);
// //         setMapCenter(car.coordinates); // התרכז ברכב שנבחר
// //         setIsInfoWindowOpen(true); // פתח את ה-infoWindow
// //       }
// //     }

// //   }, [location]); // הפעל מחדש כש-location משתנה


// //   const handleMarkerClick = (car) => {
// //     setSelectedCar(car);
// //     setIsInfoWindowOpen(true);  
// //   };

// //   const handleCloseClick = () => {
// //     setIsInfoWindowOpen(false);
// //   };


// //   const getMapOptions = () => {

// //     const savedTheme = localStorage.getItem('theme');
// //     const isDarkMode = savedTheme ? savedTheme === 'dark' : false;
    
// //     return {
// //       disableDefaultUI: true,
// //       zoomControl: false,
// //       mapTypeControl: false,
// //       scaleControl: false,
// //       streetViewControl: false,
// //       rotateControl: false,
// //       fullscreenControl: false,
// //       draggable: true,
// //       scrollwheel: true,
// //       disableDoubleClickZoom: true,
// //       minZoom: 10,
// //       maxZoom: 20,
// //       clickableIcons: false,
// //       styles: isDarkMode ? nightMapStyles : dayMapStyles,
// //     };
// //   };

// //   const getCarIcon = (category) => {
// //     switch (category) {
// //       case 'mini':
// //         return miniCarIcon;
// //       case 'family':
// //         return familyCarIcon;
// //       case 'business':
// //         return businessCarIcon;
// //       case 'SUV':
// //         return suvCarIcon;
// //       default:
// //         return '../images/car-side-solid.svg';
// //     }
// //   };


// //   const { isLoaded } = useLoadScript({
// //     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
// //     // libraries: ["places"],
// //     language: 'iw',
// //   });

// //   if (!isLoaded) return <LoadingPage />;


// //   const handleLocationButtonClick = () => {
// //     navigator.geolocation.getCurrentPosition(
// //       (position) => {
// //         const { latitude, longitude } = position.coords;
// //         const newLocation = { lat: latitude, lng: longitude }; // ערך חדש למיקום המשתמש
// //         setMapCenter(newLocation);
// //         setUserLocation(newLocation);
// //         localStorage.setItem('userLocation', JSON.stringify(newLocation)); // שמור ב-localStorage
// //         setIsLocationSet(true); // עדכון המצב אם המיקום נשמר
// //       },
// //       (error) => {
// //         console.error('Error getting user location:', error);
// //       }
// //     );
// //   };


// //   return (
// //     <div className='map-app'>
// //       <GoogleMap
// //         zoom={16}
// //         center={mapCenter}
// //         mapContainerStyle={ { height: '100%', width: '100%' } }
// //         options={ getMapOptions() }
// //       >
// //         {userLocation && (
// //           <Marker //window.google.maps.marker.AdvancedMarkerElement
// //             position={userLocation}
// //             center={userLocation}
// //           />
// //         )}

// //           <div className='location-button' onClick={handleLocationButtonClick}>
// //             <div className={`fa-location ${isLocationSet ? 'blue' : ''}`}>
// //               <TbCurrentLocation />
// //             </div>
// //           </div>


// //           <Link to="/car-list">
// //             <div className='car-list-map fa-location'>
// //               <IoListSharp />
// //             </div>
// //           </Link> 

// //         {cars.map((car) => {
// //           const icon = getCarIcon(car.category);
// //           return (
// //             <Marker
// //               key={car.id}
// //               position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
// //               onClick={() => handleMarkerClick(car)}
// //               title={car.name}
// //               icon={{
// //                 url: icon,
// //                 scaledSize: new window.google.maps.Size(35, 35),
// //               }}
// //             />
// //           );
// //         })}

// //         {(selectedCar && isInfoWindowOpen ) && (
// //           <CarInfoWindow
// //             selectedCar={selectedCar}
// //             userLocation={userLocation}
// //             onCloseClick={handleCloseClick}
// //           />
// //         )}

// //       </GoogleMap>

// //     </div>
// //   );
// // };

// // export default withOfflineOverlay(Map);













import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { fetchCarsFromFirebase } from '../data/fetchCars';
import dayMapStyles from '../assets/dayMapStyles';
import nightMapStyles from '../assets/nightMapStyles';
import { TbCurrentLocation } from "react-icons/tb";
import CarInfoWindow from '../components/infoWindow'; 
import LoadingPage from '../assets/LoadingPage';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import '../styles/map.css';
import { IoListSharp } from 'react-icons/io5';

// import miniCarIcon from '../images/mini-car.svg';
// import familyCarIcon from '../images/family-car-icon.svg';
// import businessCarIcon from '../images/business-car-icon.svg';
// import suvCarIcon from '../images/suv-car-icon.svg';
import movingCar from '../images/moving-car.gif';

const CARS_CACHE_KEY = 'cachedCars';
const USER_LOCATION_KEY = 'userLocation';

const Map = () => {
  // const { t } = useTranslation();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 31.795729, lng: 35.219848 });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);
  const [isDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'iw',
  });

  const fetchCars = useCallback(async () => {
    try {
      const cachedCars = localStorage.getItem(CARS_CACHE_KEY);
      if (cachedCars) {
        setCars(JSON.parse(cachedCars));
        setIsLoading(false);
        return;
      }

      const fetchedCars = await fetchCarsFromFirebase();
      setCars(fetchedCars);
      localStorage.setItem(CARS_CACHE_KEY, JSON.stringify(fetchedCars));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();

    const storedLocation = localStorage.getItem(USER_LOCATION_KEY);
    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setUserLocation(parsedLocation);
      setMapCenter(parsedLocation);
      setIsLocationSet(true);
    }
  }, [fetchCars]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const carId = searchParams.get('carId');
    if (carId) {
      const car = cars.find(c => c.id === carId);
      if (car) {
        setSelectedCar(car);
        setMapCenter(car.coordinates);
        setIsInfoWindowOpen(true);
      }
    }
  }, [location, cars]);

  const handleMarkerClick = useCallback((car) => {
    setSelectedCar(car);
    setIsInfoWindowOpen(true);  
  }, []);

  const handleCloseClick = useCallback(() => {
    setIsInfoWindowOpen(false);
  }, []);

  const getMapOptions = useCallback(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme ? savedTheme === 'dark' : false;
    
    return {
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      draggable: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      minZoom: 10,
      maxZoom: 20,
      clickableIcons: false,
      styles: isDarkMode ? nightMapStyles : dayMapStyles,
    };
  }, []);

  const getCarIcon = useCallback((category) => {
    switch (category) {
      // case 'mini':
      //   return miniCarIcon;
      // case 'family':
      //   return familyCarIcon;
      // case 'business':
      //   return businessCarIcon;
      // case 'SUV':
      //   return suvCarIcon;
      default:
        // return '../images/car-side-solid.svg';
        return movingCar;
    }
  }, []);

  const handleLocationButtonClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setMapCenter(newLocation);
        setUserLocation(newLocation);
        localStorage.setItem(USER_LOCATION_KEY, JSON.stringify(newLocation));
        setIsLocationSet(true);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const renderMarkers = useMemo(() => {
    if (!isLoaded) return null;
    return cars.map((car) => {
      const icon = getCarIcon(car.category);
      return (
        <Marker
          key={car.id}
          position={{ lat: car.coordinates.lat, lng: car.coordinates.lng }}
          onClick={() => handleMarkerClick(car)}
          title={car.name}
          icon={{
            url: icon,
            scaledSize: new window.google.maps.Size(35, 35),
          }}
        />
      );
    });
  }, [cars, getCarIcon, handleMarkerClick, isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || isLoading) return <LoadingPage />;

  return (
    <div className='map-app'>
      <GoogleMap
        zoom={16}
        center={mapCenter}
        mapContainerStyle={{ height: '100%', width: '100%' }}
        options={getMapOptions()}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            center={userLocation}
          />
        )}

        <div className='location-button' onClick={handleLocationButtonClick}>
          <div className={`fa-location ${isLocationSet ? 'blue' : ''}`}>
            <TbCurrentLocation />
          </div>
        </div>

        <Link to="/car-list">
          <div className='car-list-map fa-location'>
            <IoListSharp />
          </div>
        </Link> 

        {renderMarkers}

        {(selectedCar && isInfoWindowOpen) && (
          <CarInfoWindow
            selectedCar={selectedCar}
            userLocation={userLocation}
            onCloseClick={handleCloseClick}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default withOfflineOverlay(Map);







// בסך הכל, השינויים העיקריים שבוצעו לקומפוננטת ה-MAP הם:

// 1. **שימוש במטמון מקומי**:

//   1. הוספנו שימוש ב-`localStorage` עם מפתחות `CARS_CACHE_KEY` ו-`USER_LOCATION_KEY` לשמירה וקריאה של נתוני המכוניות ומיקום המשתמש.
//   2. זה מאפשר טעינה מהירה יותר של נתונים ומפחית את הצורך בבקשות חוזרות לשרת.

// 2. **אופטימיזציה של פונקציות**:

//   1. השתמשנו ב-`useCallback` לפונקציות כמו `fetchCars`, `handleMarkerClick`, `handleCloseClick`, `getMapOptions`, `getCarIcon`, ו-`handleLocationButtonClick`.
//   2. זה מונע יצירה מחדש של פונקציות בכל רינדור ומשפר את הביצועים.

// 3. **שימוש ב-`useMemo`**:

//   1. השתמשנו ב-`useMemo` לרינדור של הסמנים על המפה (`renderMarkers`).
//   2. זה מונע חישובים מיותרים ומשפר את ביצועי הרינדור.

// 4. **פיצול `useEffect`**:

//   1. פיצלנו את ה-`useEffect` הגדול לשני אפקטים נפרדים, אחד לטעינת המכוניות ומיקום המשתמש, והשני לטיפול בפרמטרים של ה-URL.
//   2. זה משפר את הקריאות של הקוד ומאפשר ניהול טוב יותר של תלויות.

// 5. **שיפור בטיפול במטמון**:

//   1. שינינו את הלוגיקה של `fetchCars` כך שהיא תשתמש במטמון אם הוא קיים, ותעדכן את המטמון רק אם יש צורך בטעינה מחדש מ-Firebase.
//   2. זה מפחית את מספר הבקשות לשרת ומשפר את זמני הטעינה.

// 6. **טיפול בטעינת Google Maps API**:

//   1. הוספנו בדיקה `if (!isLoaded) return null;` בתוך `renderMarkers`.
//   2. זה מונע גישה ל-`window.google` לפני שה-API נטען במלואו ומונע שגיאות.

// 7. **טיפול בשגיאת טעינה**:

//   1. הוספנו בדיקה `if (loadError) return <div>Error loading maps</div>;`.
//   2. זה מספק משוב למשתמש במקרה של שגיאה בטעינת ה-API.

// 8. **שימוש ב-`useLoadScript`**:

//   1. העברנו את `useLoadScript` לתחילת הקומפוננטה ועדכנו את השימוש ב-`isLoaded` ו-`loadError`.
//   2. זה מאפשר ניהול טוב יותר של מצב הטעינה של ה-API.

// 9. **שיפור בקריאות הקוד**:

//   1. ארגנו מחדש את הקוד כדי לשפר את הקריאות והתחזוקתיות שלו.
//   2. זה מקל על פיתוח ותחזוקה עתידיים.

// 10. **שימוש עקבי ב-`useCallback` ו-`useMemo`**:
//   1. וידאנו שכל הפונקציות והערכים המחושבים עטופים ב-`useCallback` ו-`useMemo` בהתאמה.
//   2. זה משפר את ביצועי הרינדור ומפחית חישובים מיותרים.
