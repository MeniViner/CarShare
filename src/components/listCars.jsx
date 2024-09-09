import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchCarsFromFirebase } from '../data/fetchCars';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import { calculateDistance } from '../utils/distanceCalculator';
import { TfiLocationPin } from "react-icons/tfi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/listCars.css';


import { CiBookmarkPlus } from "react-icons/ci";
import { RiPinDistanceLine } from "react-icons/ri";
import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation } from "react-icons/md";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
import { PiSeatbeltFill } from "react-icons/pi";
import LoadingPage from '../assets/LoadingPage';

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../data/firebaseConfig';
import { BsFuelPumpFill } from 'react-icons/bs';

const CARS_CACHE_KEY = 'cachedCars';
const CARS_CACHE_TIMESTAMP_KEY = 'cachedCarsTimestamp';
const USER_LOCATION_KEY = 'userLocation';
const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const ListCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [savedCarIds, setSavedCarIds] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [sortKey, setSortKey] = useState('nearby');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchCars = useCallback(async () => {
    try {
      const cachedCars = localStorage.getItem(CARS_CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(CARS_CACHE_TIMESTAMP_KEY);
      const currentTime = new Date().getTime();

      if (cachedCars && cachedTimestamp && currentTime - parseInt(cachedTimestamp) < CACHE_EXPIRY_TIME) {
        setCars(JSON.parse(cachedCars));
        setIsLoading(false);
        return;
      }

      const fetchedCars = await fetchCarsFromFirebase();
      setCars(fetchedCars);
      localStorage.setItem(CARS_CACHE_KEY, JSON.stringify(fetchedCars));
      localStorage.setItem(CARS_CACHE_TIMESTAMP_KEY, currentTime.toString());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setIsLoading(false);
      toast.error(t('Failed to load cars. Please try again.'));
    }
  }, [t]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const fetchSavedCarIds = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setSavedCarIds(userData.savedCars || []);
      }
    } catch (error) {
      console.error('Error fetching saved car ids:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchSavedCarIds();
      } else {
        setSavedCarIds([]);
      }
    });

    const storedLocation = localStorage.getItem(USER_LOCATION_KEY);
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }

    return () => unsubscribe();
  }, [fetchSavedCarIds]);

  const isCarSaved = useCallback((carId) => savedCarIds.includes(carId), [savedCarIds]);

  const saveCar = useCallback(async (carId) => {
    if (!auth.currentUser) {
      toast.info(t('Please log in to save cars.'));
      return;
    }

    try {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDoc);

      let updatedSavedCars;
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        updatedSavedCars = isCarSaved(carId)
          ? (userData.savedCars || []).filter(id => id !== carId)
          : [...(userData.savedCars || []), carId];
        await updateDoc(userDoc, { savedCars: updatedSavedCars });
      } else {
        updatedSavedCars = [carId];
        await setDoc(userDoc, { savedCars: updatedSavedCars });
      }

      setSavedCarIds(updatedSavedCars);
      toast.success(isCarSaved(carId) ? t('Car removed from saved list.') : t('Car saved successfully'), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error toggling car save status:', error);
      toast.error(t('Failed to update car save status.'));
    }
  }, [t, isCarSaved]);

  const handleCarClick = useCallback((car) => {
    navigate(`/map?carId=${car.id}`);
  }, [navigate]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  }, []);

  const sortCars = useCallback((carsToSort) => {
    return [...carsToSort].sort((a, b) => {
      let compare = 0;
      switch (sortKey) {
        case 'nearby':
          compare = (a.distance || Infinity) - (b.distance || Infinity);
          break;
        case 'category':
          compare = a.category.localeCompare(b.category);
          break;
        case 'seats':
          compare = a.seats - b.seats;
          break;
        case 'year':
          compare = a.year - b.year;
          break;
        case 'fuelType':
          compare = a.fuelType.localeCompare(b.fuelType);
          break;
        case 'battery':
          compare = (parseFloat(a.battery) || 0) - (parseFloat(b.battery) || 0);
          break;
        default:
          break;
      }
      return sortOrder === 'asc' ? compare : -compare;
    });
  }, [sortKey, sortOrder]);

  const calculateCarDistances = useCallback(() => {
    return cars.map(car => ({
      ...car,
      distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
    }));
  }, [cars, userLocation]);

  const sortedCars = useMemo(() => {
    const carsWithDistances = calculateCarDistances();
    return sortCars(carsWithDistances);
  }, [calculateCarDistances, sortCars]);

  const formatDistance = useCallback((distance) => {
    if (distance === null) return t('Unknown distance');
    if (distance > 1000) {
      return t('{{distance}} km', { distance: (distance / 1000).toFixed(1) });
    } else {
      return t('{{distance}} meter', { distance: Math.round(distance) });
    }
  }, [t]);

  const isHybrid = useCallback((car) => {
    return car.fuelType === 'Hybrid';
  }, []);

  const renderCarItem = useCallback((car) => (
    <div key={car.id} className="car-item">
      <div className="car-item-info">
        <div className="car-image-container" onClick={() => handleCarClick(car)}>
          <img src={car.image5} alt={t('{{brand}} {{model}}', { brand: car.brand, model: car.model })} />
          {isHybrid(car) && <img src='images/hybrid.png' alt={t('Hybrid')} className="hybrid-badge" />}
        </div>
        <div className="car-details" onClick={() => handleCarClick(car)}>
          <h3>{t('{{brand}} {{model}} {{year}}', { brand: car.brand, model: car.model, year: car.year })}</h3>
          {car.distance !== null ? (
            <>
              <RiPinDistanceLine />
              <span>{formatDistance(car.distance)}</span>
            </>
          ) : (
            <MdLocationOff /> 
          )}
          <h4 className="itemi"><TfiLocationPin/>{car.address ? t(car.address.street + ', ' + car.address.city) : t('Address not available')}</h4>
          <p>
            <span>{t('{{price}} ₪/hour', { price: Math.floor(car.pricePerHour) })}</span>
          </p>
        </div>
        <button onClick={() => saveCar(car.id)} className='saved-bt'>
          {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
        </button>
      </div>
      <div className="more-details-in-list">
        <div className="item"><FaCarSide /> {t(car.category)} </div>
        <div className="item"><BsFuelPumpFill /> {t(car.fuelType)}</div>
        <div className="item"><MdElectricCar /> {car.battery}</div>
        <div className="item"><PiSeatbeltFill/> {t('{{seats}} seats', { seats: car.seats })}</div>
      </div>
    </div>
  ), [t, handleCarClick, isHybrid, formatDistance, saveCar, isCarSaved]);

  return (
    <div className='listCars-container'>
      <ToastContainer />
      <div className="listCars-header">
        <div className="page-header list-cars-header">
          <h1><strong>{t('we')}</strong> {t('cars')}</h1> 
        </div>

        <div className="sort-buttons-container">
          <div className="sort-buttons">
            <button 
              className="sort-order-button" 
              onClick={toggleSortOrder}
            >
              {sortOrder === 'asc' ? <FaRegArrowAltCircleUp/> : <FaRegArrowAltCircleDown/>}
            </button>
            <button 
              className={sortKey === 'nearby' ? 'active' : ''} 
              onClick={() => setSortKey('nearby')}
            >
              <MdMyLocation /> {t('Nearby')}
            </button>
            <button 
              className={sortKey === 'category' ? 'active' : ''} 
              onClick={() => setSortKey('category')}
            >
              <FaCarSide /> {t('Category')}
            </button>
            <button 
              className={sortKey === 'seats' ? 'active' : ''} 
              onClick={() => setSortKey('seats')}
            >
              <PiSeatbeltFill/> {t('Seats')}
            </button>
            <button
              className={sortKey === 'year' ? 'active' : ''}
              onClick={() => setSortKey('year')}
            >
              <MdDateRange /> {t('Year')}
            </button>
            <button 
              className={sortKey === 'fuelType' ? 'active' : ''} 
              onClick={() => setSortKey('fuelType')}
            > 
              <BsFuelPumpFill /> {t('Fuel Type')}
            </button>
            <button 
              className={sortKey === 'battery' ? 'active' : ''} 
              onClick={() => setSortKey('battery')}
            > 
              <MdElectricCar /> {t('Battery')}
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <LoadingPage />
        </div>
      ) : (
        <div className="cars-list">
          {sortedCars.map(renderCarItem)}
        </div>
      )}
    </div>
  );
};

export default withOfflineOverlay(ListCars);



// **שימוש במטמון מקומי**: הוספנו שימוש ב-`localStorage` עם מפתחות `CARS_CACHE_KEY` ו-`USER_LOCATION_KEY` לשמירה וקריאה של נתוני המכוניות ומיקום המשתמש.
// **אופטימיזציה של פונקציות**: השתמשנו ב-`useCallback` לכל הפונקציות בקומפוננטה כדי למנוע יצירה מחדש של פונקציות בכל רינדור.
// **שימוש ב-`useMemo`**: השתמשנו ב-`useMemo` לחישוב הרשימה הממוינת של המכוניות כדי למנוע חישובים מיותרים.
// **שיפור ביצועים**: הוצאנו את רינדור פריט המכונית למשתנה `renderCarItem` שמחושב מראש, כדי למנוע רינדור מיותר.
// **שיפור בטיפול באירועים**: השתמשנו ב-`useCallback` עבור פונקציות טיפול באירועים כדי לשפר את הביצועים.
// **קוד נקי יותר**: ארגנו מחדש את הקוד כדי לשפר את הקריאות והתחזוקתיות שלו.
// **שמירה על כל התוכן**: כפי שנדרש, שמרנו על כל התוכן והפונקציונליות של הקומפוננטה המקורית.