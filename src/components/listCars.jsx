import React, { useState, useEffect } from 'react'; 
import { useNavigate  } from 'react-router-dom';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import { calculateDistance } from '../utils/distanceCalculator'; 
import cars from '../data/carsData';
import '../styles/listCars.css';
import Swal from 'sweetalert2';
import { CiBookmarkPlus } from "react-icons/ci"; 
import { RiPinDistanceLine } from "react-icons/ri";
import { MdBookmarkAdded, MdLocationOff } from "react-icons/md"; 

import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { auth, db } from '../data/firebaseConfig'; 

const ListCars = () => {

  const navigate  = useNavigate(); 
  const [savedCarIds, setSavedCarIds] = useState([]); 
  const [userLocation, setUserLocation] = useState(null); 

  useEffect(() => {
    const fetchSavedCarIds = async () => {
      if (!auth.currentUser) {
        return;
      }
      try {
        const q = query(collection(db, 'savedCars'), where('userId', '==', auth.currentUser.uid)); 
        const querySnapshot = await getDocs(q); 
        const ids = querySnapshot.docs.map(doc => doc.data().carId); 
        setSavedCarIds(ids); 
      } catch (error) {
        console.error('Error fetching saved car ids:', error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(user => { 
      if (user) {
        fetchSavedCarIds();
      } else {
        setSavedCarIds([]);
      }
    });

    //
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation)); // עדכן את מצב מיקום המשתמש
    }


    return () => unsubscribe();
  }, []); 

  const isCarSaved = (carId) => savedCarIds.includes(carId); 

  const saveCar = async (carId) => {
    if (!auth.currentUser) {
      Swal.fire('Please log in', 'To save cars, please log in.', 'info'); 
      return;
    }
    if (isCarSaved(carId)) {
      Swal.fire('Already Saved', 'This car is already saved.', 'info');
      return;
    }
    try {
      await addDoc(collection(db, 'savedCars'), {
        userId: auth.currentUser.uid,
        carId
      });
      setSavedCarIds(prev => [...prev, carId]); // כדי לעדכן את הסטייט לאחר שמירת הרכב   
      Swal.fire('Saved', 'Car saved successfully!', 'success'); 
    } catch (error) {
      console.error('Error saving car:', error);
      Swal.fire('Error', 'Failed to save car.', 'error'); 
    }
  };

  const handleCarClick = (car) => {
    navigate(`/map?carId=${car.id}`); // הפניה לדף המפה עם carId כפרמטר
  };

  const calculateCarDistances = () => {
    if (!userLocation) return cars.map(car => ({ ...car, distance: null }));
    return cars.map(car => ({
      ...car,
      distance: calculateDistance(userLocation, car.coordinates) // חישוב המרחק עבור כל רכב
    }));
  };
  

  return (
    <>
      <div className="cars-list">
        <h2>Vehicles nearby</h2>
        {calculateCarDistances().map((car) => (


          <div 
            key={car.id} 
            className="car-item"
            onClick={() => handleCarClick(car)}
          >
            <img src={car.image} alt={`${car.brand} ${car.model}`} />
            <div className="car-details">
              <h3>{`${car.brand} ${car.model}`}</h3>

              {car.distance ? (
                <>
                  <RiPinDistanceLine />
                  <span>{car.distance}</span>
                </>
              ) : (
                <MdLocationOff /> // הצג אייקון של מיקום כבוי אם אין מיקום
              )}

              <p>
                <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
              </p>
            </div>
            
            <div>
              
            </div>
            <button onClick={() => saveCar(car.id)} className='saved-bt'>
              {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
            </button>
          </div>
        ))}

      </div> 
    </>
  );
};

export default withOfflineOverlay(ListCars);

