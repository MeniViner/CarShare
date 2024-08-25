// import React, { useState, useEffect } from 'react'; 
// import { useNavigate } from 'react-router-dom';
// import withOfflineOverlay from '../assets/withOfflineOverlay';
// import { calculateDistance } from '../utils/distanceCalculator'; 
// import cars from '../data/carsData';
// import '../styles/listCars.css';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';

// import { CiBookmarkPlus } from "react-icons/ci"; 
// import { RiPinDistanceLine } from "react-icons/ri";
// import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation, MdKeyboardDoubleArrowRight } from "react-icons/md"; 
// import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
// import { PiSeatbeltFill } from "react-icons/pi";

// import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
// import { auth, db } from '../data/firebaseConfig'; 
// import { BsFuelPumpFill } from 'react-icons/bs';


// const ListCars = () => {

//   const navigate  = useNavigate(); 
//   const [savedCarIds, setSavedCarIds] = useState([]); 
//   const [userLocation, setUserLocation] = useState(null); 
//   const [sortKey, setSortKey] = useState('nearby'); 
//   const [sortOrder, setSortOrder] = useState('asc'); 


//   useEffect(() => {
//     const fetchSavedCarIds = async () => {
//       if (!auth.currentUser) {
//         return;
//       }
//       try {
//         const q = query(collection(db, 'savedCars'), where('userId', '==', auth.currentUser.uid)); 
//         const querySnapshot = await getDocs(q); 
//         const ids = querySnapshot.docs.map(doc => doc.data().carId); 
//         setSavedCarIds(ids); 
//       } catch (error) {
//         console.error('Error fetching saved car ids:', error);
//       }
//     };

//     const unsubscribe = auth.onAuthStateChanged(user => { 
//       if (user) {
//         fetchSavedCarIds();
//       } else {
//         setSavedCarIds([]);
//       }
//     });

//     const storedLocation = localStorage.getItem('userLocation');
//     if (storedLocation) {
//       setUserLocation(JSON.parse(storedLocation)); // עדכן את מצב מיקום המשתמש
//     }

//     return () => unsubscribe();
//   }, []); 

//   const isCarSaved = (carId) => savedCarIds.includes(carId); 

//   const saveCar = async (carId) => {
//     if (!auth.currentUser) {
//       toast.info('Please log in to save cars.'); 
//       return;
//     }
//     if (isCarSaved(carId)) {
//       toast.info('This car is already saved.');
//       return;
//     }
//     try {
//       await addDoc(collection(db, 'savedCars'), {
//         userId: auth.currentUser.uid,
//         carId
//       });
//       setSavedCarIds(prev => [...prev, carId]); // כדי לעדכן את הסטייט לאחר שמירת הרכב   
//       toast.success('Car saved successfully!'); 
//     } catch (error) {
//       console.error('Error saving car:', error);
//       toast.error('Failed to save car.'); 
//     }
//   };

//   const handleCarClick = (car) => {
//     navigate(`/map?carId=${car.id}`); // הפניה לדף המפה עם carId כפרמטר
//   };

//   const toggleSortOrder = () => {
//     setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
//   };
  

//   const sortCars = (cars) => {
//     return cars.sort((a, b) => {
//       let compare = 0;
//       if (sortKey === 'nearby') {
//         compare = a.distance - b.distance;
//       } else if (sortKey === 'category') {
//         compare = a.category.localeCompare(b.category);
//       } else if (sortKey === 'seats') {
//         compare = a.seats - b.seats;
//       } else if (sortKey === 'year') {
//         compare = a.year - b.year;
//       } else if (sortKey === 'fuelType') {
//         compare = a.fuelType.localeCompare(b.fuelType);
//       } else if (sortKey === 'battery') {
//         compare = a.battery - b.battery;
//       }
//       return sortOrder === 'asc' ? compare : -compare;
//     });
//   };
  

//   const calculateCarDistances = () => {
//     let carsWithDistances = cars.map(car => ({
//       ...car,
//       distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
//     }));
//     return sortCars(carsWithDistances);
//   };

//   const formatDistance = (distance) => {
//     distance = distance.toString(); // Convert distance to string
//     if (parseFloat(distance) > 1000) {
//       return (parseFloat(distance) / 1000).toFixed(0) + " km";
//     } else {
//       return parseFloat(distance).toFixed(0) + " meter";
//     }
//   };
  
//   const isHybrid = (car) => {
//     return car.fuelType === 'Hybrid';
//   };

//   return (
//     <div className='listCars-container'>
//       <ToastContainer />
//       <div className="listCars-header">
//         <div className="page-header list-cars-header">
//           <h1><strong>we</strong> cars</h1> 
//         </div>

//         <div className="sort-buttons-container">
//           <div className="sort-buttons">
//             <button 
//               className="sort-order-button" 
//               onClick={toggleSortOrder}
//             >
//               {sortOrder === 'asc' ? <FaRegArrowAltCircleUp/> : <FaRegArrowAltCircleDown/>}
//             </button>
//             <button 
//               className={sortKey === 'nearby' ? 'active' : ''} 
//               onClick={() => setSortKey('nearby')}
//             >
//               <MdMyLocation /> Nearby 
//             </button>
//             <button 
//               className={sortKey === 'category' ? 'active' : ''} 
//               onClick={() => setSortKey('category')}
//             >
//               <FaCarSide /> Category
//             </button>
//             <button 
//               className={sortKey === 'seats' ? 'active' : ''} 
//               onClick={() => setSortKey('seats')}
//             >
//               <PiSeatbeltFill/> Seats
//             </button>
//             <button
//               className={sortKey === 'year' ? 'active' : ''}
//               onClick={() => setSortKey('year')}
//             >
//               <MdDateRange />  Year
//             </button>
//             <button 
//               className={sortKey === 'fuelType' ? 'active' : ''} 
//               onClick={() => setSortKey('fuelType')}
//             > 
//               <BsFuelPumpFill /> Fuel Type
//             </button>
//             <button 
//               className={sortKey === 'battery' ? 'active' : ''} 
//               onClick={() => setSortKey('battery')}
//             > 
//               <MdElectricCar /> Battery
//             </button>
//           </div>
//         </div>

//       </div>

//       <div className="cars-list">
//         {calculateCarDistances().map((car) => (
//           <>
//             <div key={car.id} className="car-item">
//               <div className="car-item-info">
//                 <div className="car-image-container" onClick={() => handleCarClick(car)}>
//                   <img src={car.image} alt={`${car.brand} ${car.model}`} />
//                   {isHybrid(car) && <img src='images/hybrid.png' alt="Hybrid" className="hybrid-badge" />}
//                 </div>
//                 <div className="car-details" onClick={() => handleCarClick(car)}  >
//                   <h3>{`${car.brand} ${car.model}`} {car.year}</h3>
//                   {car.distance ? (
//                     <>
//                       <RiPinDistanceLine />
//                       <span>{formatDistance(car.distance)}</span>
//                     </>
//                   ) : (
//                     <MdLocationOff /> 
//                   )}
//                   <p>
//                     <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
//                   </p>
//                 </div>
//                 <button onClick={() => saveCar(car.id)} className='saved-bt'>
//                   {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
//                 </button>
//               </div>
//               <div className="more-details-in-list">
//                 <div className="item"><FaCarSide /> {car.category} </div>
//                 <div className="item"><BsFuelPumpFill /> {car.fuelType}</div>
//                 <div className="item"><MdElectricCar /> {car.battery}</div>
//                 <div className="item"><PiSeatbeltFill/>  {car.seats}</div>
//                 <div className="item">{car.addres}</div>
//               </div>
// {/* 
//               <div className="more-details-button">
//                 <button class="cssbuttons-io-button">
//                   more details
//                   <div class="icon"><svg height="24" width="24"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg></div>
//                 </button>
//               </div> */}

//             </div>
//           </>
//         ))}
//       </div> 
//     </div>
//   );
// };

// export default withOfflineOverlay(ListCars);






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
import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation } from "react-icons/md";
import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
import { PiSeatbeltFill } from "react-icons/pi";

import { collection, addDoc, query, getDocs, where, deleteDoc } from "firebase/firestore";
import { auth, db } from '../data/firebaseConfig';
import { BsFuelPumpFill } from 'react-icons/bs';

const ListCars = () => {
  const navigate = useNavigate();
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
      setUserLocation(JSON.parse(storedLocation));
    }

    return () => unsubscribe();
  }, []);

  const isCarSaved = (carId) => savedCarIds.includes(carId);

  const saveCar = async (carId) => {
    if (!auth.currentUser) {
      toast.info('Please log in to save cars.');
      return;
    }

    try {
      if (isCarSaved(carId)) {
        // Remove the car from saved cars
        const q = query(
          collection(db, 'savedCars'),
          where('userId', '==', auth.currentUser.uid),
          where('carId', '==', carId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });

        setSavedCarIds(prev => prev.filter(id => id !== carId));
        toast.success('Car removed from saved list.');
      } else {
        // Add the car to saved cars
        await addDoc(collection(db, 'savedCars'), {
          userId: auth.currentUser.uid,
          carId
        });
        setSavedCarIds(prev => [...prev, carId]);
        toast.success('Car saved successfully!');
      }
    } catch (error) {
      console.error('Error toggling car save status:', error);
      toast.error('Failed to update car save status.');
    }
  };

  const handleCarClick = (car) => {
    navigate(`/map?carId=${car.id}`); // הפניה לדף המפה עם carId כפרמטר
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
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

  const formatDistance = (distance) => {
    distance = distance.toString(); // Convert distance to string
    if (parseFloat(distance) > 1000) {
      return (parseFloat(distance) / 1000).toFixed(0) + " km";
    } else {
      return parseFloat(distance).toFixed(0) + " meter";
    }
  };
  
  const isHybrid = (car) => {
    return car.fuelType === 'Hybrid';
  };

  return (
    <div className='listCars-container'>
      <ToastContainer />
      <div className="listCars-header">
        <div className="page-header list-cars-header">
          <h1><strong>we</strong> cars</h1> 
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
              <MdMyLocation /> Nearby 
            </button>
            <button 
              className={sortKey === 'category' ? 'active' : ''} 
              onClick={() => setSortKey('category')}
            >
              <FaCarSide /> Category
            </button>
            <button 
              className={sortKey === 'seats' ? 'active' : ''} 
              onClick={() => setSortKey('seats')}
            >
              <PiSeatbeltFill/> Seats
            </button>
            <button
              className={sortKey === 'year' ? 'active' : ''}
              onClick={() => setSortKey('year')}
            >
              <MdDateRange />  Year
            </button>
            <button 
              className={sortKey === 'fuelType' ? 'active' : ''} 
              onClick={() => setSortKey('fuelType')}
            > 
              <BsFuelPumpFill /> Fuel Type
            </button>
            <button 
              className={sortKey === 'battery' ? 'active' : ''} 
              onClick={() => setSortKey('battery')}
            > 
              <MdElectricCar /> Battery
            </button>
          </div>
        </div>

      </div>

      <div className="cars-list">
        {calculateCarDistances().map((car) => (
          <>
            <div key={car.id} className="car-item">
              <div className="car-item-info">
                <div className="car-image-container" onClick={() => handleCarClick(car)}>
                  <img src={car.image} alt={`${car.brand} ${car.model}`} />
                  {isHybrid(car) && <img src='images/hybrid.png' alt="Hybrid" className="hybrid-badge" />}
                </div>
                <div className="car-details" onClick={() => handleCarClick(car)}  >
                  <h3>{`${car.brand} ${car.model}`} {car.year}</h3>
                  {car.distance ? (
                    <>
                      <RiPinDistanceLine />
                      <span>{formatDistance(car.distance)}</span>
                    </>
                  ) : (
                    <MdLocationOff /> 
                  )}
                  <p>
                    <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
                  </p>
                </div>
                <button onClick={() => saveCar(car.id)} className='saved-bt'>
                  {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
                </button>
              </div>
              <div className="more-details-in-list">
                <div className="item"><FaCarSide /> {car.category} </div>
                <div className="item"><BsFuelPumpFill /> {car.fuelType}</div>
                <div className="item"><MdElectricCar /> {car.battery}</div>
                <div className="item"><PiSeatbeltFill/>  {car.seats}</div>
                <div className="item">{car.addres}</div>
              </div>
              {/* 
              <div className="more-details-button">
                <button class="cssbuttons-io-button">
                  more details
                  <div class="icon"><svg height="24" width="24"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg></div>
                </button>
              </div> 
              */}

            </div>
          </>
        ))}
      </div> 
    </div>
  );
};

export default withOfflineOverlay(ListCars);
