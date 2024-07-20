import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import { calculateDistance } from '../utils/distanceCalculator'; 
import cars from '../data/carsData';
import '../styles/listCars.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { CiBookmarkPlus } from "react-icons/ci"; 
import { RiPinDistanceLine } from "react-icons/ri";
import { MdBookmarkAdded, MdLocationOff } from "react-icons/md"; 
import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { auth, db } from '../data/firebaseConfig'; 


const ListCars = () => {

  const navigate  = useNavigate(); 
  const [savedCarIds, setSavedCarIds] = useState([]); 
  const [userLocation, setUserLocation] = useState(null); 
  const [sortKey, setSortKey] = useState('nearby'); 
  const [sortOrder, setSortOrder] = useState('asc'); 


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

    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation)); // עדכן את מצב מיקום המשתמש
    }

    return () => unsubscribe();
  }, []); 

  const isCarSaved = (carId) => savedCarIds.includes(carId); 

  const saveCar = async (carId) => {
    if (!auth.currentUser) {
      toast.info('Please log in to save cars.'); 
      return;
    }
    if (isCarSaved(carId)) {
      toast.info('This car is already saved.');
      return;
    }
    try {
      await addDoc(collection(db, 'savedCars'), {
        userId: auth.currentUser.uid,
        carId
      });
      setSavedCarIds(prev => [...prev, carId]); // כדי לעדכן את הסטייט לאחר שמירת הרכב   
      toast.success('Car saved successfully!'); 
    } catch (error) {
      console.error('Error saving car:', error);
      toast.error('Failed to save car.'); 
    }
  };

  const handleCarClick = (car) => {
    navigate(`/map?carId=${car.id}`); // הפניה לדף המפה עם carId כפרמטר
  };

  const sortCars = (cars) => {
    return cars.sort((a, b) => {
      let compare = 0;
      if (sortKey === 'nearby') {
        compare = a.distance - b.distance;
      } else if (sortKey === 'category') {
        compare = a.category.localeCompare(b.category);
      } else if (sortKey === 'seats') {
        compare = a.seats - b.seats;
      } else if (sortKey === 'year') {
        compare = a.year - b.year;
      } else if (sortKey === 'fuelType') {
        compare = a.fuelType.localeCompare(b.fuelType);
      } else if (sortKey === 'battery') {
        compare = a.battery - b.battery;
      }
      return sortOrder === 'asc' ? compare : -compare;
    });
  };

  const calculateCarDistances = () => {
    let carsWithDistances = cars.map(car => ({
      ...car,
      distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
    }));
    return sortCars(carsWithDistances);
  };

  const isHybrid = (car) => {
    return car.fuelType === 'Hybrid';
  };

  return (
    <>
      <ToastContainer />
      <div className="sort-buttons">
        <button onClick={() => setSortKey('nearby')}>Nearby</button>
        <button onClick={() => setSortKey('category')}>Category</button>
        <button onClick={() => setSortKey('seats')}>Seats</button>
        <button onClick={() => setSortKey('year')}>Year</button>
        <button onClick={() => setSortKey('fuelType')}>Fuel Type</button>
        <button onClick={() => setSortKey('battery')}>Battery</button>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="cars-list">
        {calculateCarDistances().map((car) => (
          <div key={car.id} className="car-item">
            <div className="car-image-container" onClick={() => handleCarClick(car)}>
              <img src={car.image} alt={`${car.brand} ${car.model}`} />
              {isHybrid(car) && <img src='images/hybrid.png' alt="Hybrid" className="hybrid-badge" />}
            </div>
            <div className="car-details" onClick={() => handleCarClick(car)}  >
              <h3>{`${car.brand} ${car.model}`} {car.year}</h3>
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
