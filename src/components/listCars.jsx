// // import React, { useState, useEffect } from 'react'; 
// // import { useNavigate } from 'react-router-dom';
// // import withOfflineOverlay from '../assets/withOfflineOverlay';
// // import { calculateDistance } from '../utils/distanceCalculator'; 
// // import cars from '../data/carsData';
// // import '../styles/listCars.css';
// // import { ToastContainer, toast } from 'react-toastify'; 
// // import 'react-toastify/dist/ReactToastify.css';

// // import { CiBookmarkPlus } from "react-icons/ci"; 
// // import { RiPinDistanceLine } from "react-icons/ri";
// // import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation, MdKeyboardDoubleArrowRight } from "react-icons/md"; 
// // import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
// // import { PiSeatbeltFill } from "react-icons/pi";

// // import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
// // import { auth, db } from '../data/firebaseConfig'; 
// // import { BsFuelPumpFill } from 'react-icons/bs';


// // const ListCars = () => {

// //   const navigate  = useNavigate(); 
// //   const [savedCarIds, setSavedCarIds] = useState([]); 
// //   const [userLocation, setUserLocation] = useState(null); 
// //   const [sortKey, setSortKey] = useState('nearby'); 
// //   const [sortOrder, setSortOrder] = useState('asc'); 


// //   useEffect(() => {
// //     const fetchSavedCarIds = async () => {
// //       if (!auth.currentUser) {
// //         return;
// //       }
// //       try {
// //         const q = query(collection(db, 'savedCars'), where('userId', '==', auth.currentUser.uid)); 
// //         const querySnapshot = await getDocs(q); 
// //         const ids = querySnapshot.docs.map(doc => doc.data().carId); 
// //         setSavedCarIds(ids); 
// //       } catch (error) {
// //         console.error('Error fetching saved car ids:', error);
// //       }
// //     };

// //     const unsubscribe = auth.onAuthStateChanged(user => { 
// //       if (user) {
// //         fetchSavedCarIds();
// //       } else {
// //         setSavedCarIds([]);
// //       }
// //     });

// //     const storedLocation = localStorage.getItem('userLocation');
// //     if (storedLocation) {
// //       setUserLocation(JSON.parse(storedLocation)); // עדכן את מצב מיקום המשתמש
// //     }

// //     return () => unsubscribe();
// //   }, []); 

// //   const isCarSaved = (carId) => savedCarIds.includes(carId); 

// //   const saveCar = async (carId) => {
// //     if (!auth.currentUser) {
// //       toast.info('Please log in to save cars.'); 
// //       return;
// //     }
// //     if (isCarSaved(carId)) {
// //       toast.info('This car is already saved.');
// //       return;
// //     }
// //     try {
// //       await addDoc(collection(db, 'savedCars'), {
// //         userId: auth.currentUser.uid,
// //         carId
// //       });
// //       setSavedCarIds(prev => [...prev, carId]); // כדי לעדכן את הסטייט לאחר שמירת הרכב   
// //       toast.success('Car saved successfully!'); 
// //     } catch (error) {
// //       console.error('Error saving car:', error);
// //       toast.error('Failed to save car.'); 
// //     }
// //   };

// //   const handleCarClick = (car) => {
// //     navigate(`/map?carId=${car.id}`); // הפניה לדף המפה עם carId כפרמטר
// //   };

// //   const toggleSortOrder = () => {
// //     setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
// //   };
  

// //   const sortCars = (cars) => {
// //     return cars.sort((a, b) => {
// //       let compare = 0;
// //       if (sortKey === 'nearby') {
// //         compare = a.distance - b.distance;
// //       } else if (sortKey === 'category') {
// //         compare = a.category.localeCompare(b.category);
// //       } else if (sortKey === 'seats') {
// //         compare = a.seats - b.seats;
// //       } else if (sortKey === 'year') {
// //         compare = a.year - b.year;
// //       } else if (sortKey === 'fuelType') {
// //         compare = a.fuelType.localeCompare(b.fuelType);
// //       } else if (sortKey === 'battery') {
// //         compare = a.battery - b.battery;
// //       }
// //       return sortOrder === 'asc' ? compare : -compare;
// //     });
// //   };
  

// //   const calculateCarDistances = () => {
// //     let carsWithDistances = cars.map(car => ({
// //       ...car,
// //       distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
// //     }));
// //     return sortCars(carsWithDistances);
// //   };

// //   const formatDistance = (distance) => {
// //     distance = distance.toString(); // Convert distance to string
// //     if (parseFloat(distance) > 1000) {
// //       return (parseFloat(distance) / 1000).toFixed(0) + " km";
// //     } else {
// //       return parseFloat(distance).toFixed(0) + " meter";
// //     }
// //   };
  
// //   const isHybrid = (car) => {
// //     return car.fuelType === 'Hybrid';
// //   };

// //   return (
// //     <div className='listCars-container'>
// //       <ToastContainer />
// //       <div className="listCars-header">
// //         <div className="page-header list-cars-header">
// //           <h1><strong>we</strong> cars</h1> 
// //         </div>

// //         <div className="sort-buttons-container">
// //           <div className="sort-buttons">
// //             <button 
// //               className="sort-order-button" 
// //               onClick={toggleSortOrder}
// //             >
// //               {sortOrder === 'asc' ? <FaRegArrowAltCircleUp/> : <FaRegArrowAltCircleDown/>}
// //             </button>
// //             <button 
// //               className={sortKey === 'nearby' ? 'active' : ''} 
// //               onClick={() => setSortKey('nearby')}
// //             >
// //               <MdMyLocation /> Nearby 
// //             </button>
// //             <button 
// //               className={sortKey === 'category' ? 'active' : ''} 
// //               onClick={() => setSortKey('category')}
// //             >
// //               <FaCarSide /> Category
// //             </button>
// //             <button 
// //               className={sortKey === 'seats' ? 'active' : ''} 
// //               onClick={() => setSortKey('seats')}
// //             >
// //               <PiSeatbeltFill/> Seats
// //             </button>
// //             <button
// //               className={sortKey === 'year' ? 'active' : ''}
// //               onClick={() => setSortKey('year')}
// //             >
// //               <MdDateRange />  Year
// //             </button>
// //             <button 
// //               className={sortKey === 'fuelType' ? 'active' : ''} 
// //               onClick={() => setSortKey('fuelType')}
// //             > 
// //               <BsFuelPumpFill /> Fuel Type
// //             </button>
// //             <button 
// //               className={sortKey === 'battery' ? 'active' : ''} 
// //               onClick={() => setSortKey('battery')}
// //             > 
// //               <MdElectricCar /> Battery
// //             </button>
// //           </div>
// //         </div>

// //       </div>

// //       <div className="cars-list">
// //         {calculateCarDistances().map((car) => (
// //           <>
// //             <div key={car.id} className="car-item">
// //               <div className="car-item-info">
// //                 <div className="car-image-container" onClick={() => handleCarClick(car)}>
// //                   <img src={car.image} alt={`${car.brand} ${car.model}`} />
// //                   {isHybrid(car) && <img src='images/hybrid.png' alt="Hybrid" className="hybrid-badge" />}
// //                 </div>
// //                 <div className="car-details" onClick={() => handleCarClick(car)}  >
// //                   <h3>{`${car.brand} ${car.model}`} {car.year}</h3>
// //                   {car.distance ? (
// //                     <>
// //                       <RiPinDistanceLine />
// //                       <span>{formatDistance(car.distance)}</span>
// //                     </>
// //                   ) : (
// //                     <MdLocationOff /> 
// //                   )}
// //                   <p>
// //                     <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
// //                   </p>
// //                 </div>
// //                 <button onClick={() => saveCar(car.id)} className='saved-bt'>
// //                   {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
// //                 </button>
// //               </div>
// //               <div className="more-details-in-list">
// //                 <div className="item"><FaCarSide /> {car.category} </div>
// //                 <div className="item"><BsFuelPumpFill /> {car.fuelType}</div>
// //                 <div className="item"><MdElectricCar /> {car.battery}</div>
// //                 <div className="item"><PiSeatbeltFill/>  {car.seats}</div>
// //                 <div className="item">{car.addres}</div>
// //               </div>
// // {/* 
// //               <div className="more-details-button">
// //                 <button class="cssbuttons-io-button">
// //                   more details
// //                   <div class="icon"><svg height="24" width="24"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg></div>
// //                 </button>
// //               </div> */}

// //             </div>
// //           </>
// //         ))}
// //       </div> 
// //     </div>
// //   );
// // };

// // export default withOfflineOverlay(ListCars);












// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import withOfflineOverlay from '../assets/withOfflineOverlay';
// // import { calculateDistance } from '../utils/distanceCalculator';
// // import cars from '../data/carsData';
// // import '../styles/listCars.css';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // import { CiBookmarkPlus } from "react-icons/ci";
// // import { RiPinDistanceLine } from "react-icons/ri";
// // import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation } from "react-icons/md";
// // import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
// // import { PiSeatbeltFill } from "react-icons/pi";

// // import { collection, addDoc, query, getDocs, where, deleteDoc } from "firebase/firestore";
// // import { doc, getDoc } from "firebase/firestore";
// // import { auth, db } from '../data/firebaseConfig';
// // import { BsFuelPumpFill } from 'react-icons/bs';

// // const ListCars = () => {
// //   const navigate = useNavigate();
// //   const [savedCarIds, setSavedCarIds] = useState([]);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [sortKey, setSortKey] = useState('nearby');
// //   const [sortOrder, setSortOrder] = useState('asc');

// //   // useEffect(() => {
// //   //   const fetchSavedCarIds = async () => {
// //   //     if (!auth.currentUser) {
// //   //       return;
// //   //     }
// //   //     try {
// //   //       const q = query(collection(db, 'savedCars'), where('userId', '==', auth.currentUser.uid));
// //   //       const querySnapshot = await getDocs(q);
// //   //       const ids = querySnapshot.docs.map(doc => doc.data().carId);
// //   //       setSavedCarIds(ids);
// //   //     } catch (error) {
// //   //       console.error('Error fetching saved car ids:', error);
// //   //     }
// //   //   };

// //   //   const unsubscribe = auth.onAuthStateChanged(user => {
// //   //     if (user) {
// //   //       fetchSavedCarIds();
// //   //     } else {
// //   //       setSavedCarIds([]);
// //   //     }
// //   //   });

// //   useEffect(() => {
// //     const fetchSavedCarIds = async () => {
// //         if (!auth.currentUser) {
// //             return;
// //         }
// //         try {
// //             const userDoc = doc(db, 'users', auth.currentUser.uid);
// //             const userSnapshot = await getDoc(userDoc);
// //             if (userSnapshot.exists()) {
// //                 const userData = userSnapshot.data();
// //                 setSavedCarIds(userData.savedCars || []);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching saved car ids:', error);
// //         }
// //     };

// //     const unsubscribe = auth.onAuthStateChanged(user => {
// //         if (user) {
// //             fetchSavedCarIds();
// //         } else {
// //             setSavedCarIds([]);
// //         }
// //     });

// //     const storedLocation = localStorage.getItem('userLocation');
// //     if (storedLocation) {
// //       setUserLocation(JSON.parse(storedLocation));
// //     }

// //     return () => unsubscribe();
// //   }, []);

// //   const isCarSaved = (carId) => savedCarIds.includes(carId);

// //   const saveCar = async (carId) => {
// //     if (!auth.currentUser) {
// //       toast.info('Please log in to save cars.');
// //       return;
// //     }

// //     try {
// //       if (isCarSaved(carId)) {
// //         // Remove the car from saved cars
// //         const q = query(
// //           collection(db, 'savedCars'),
// //           where('userId', '==', auth.currentUser.uid),
// //           where('carId', '==', carId)
// //         );
// //         const querySnapshot = await getDocs(q);
// //         querySnapshot.forEach((doc) => {
// //           deleteDoc(doc.ref);
// //         });

// //         setSavedCarIds(prev => prev.filter(id => id !== carId));
// //         toast.success('Car removed from saved list.');
// //       } else {
// //         // Add the car to saved cars
// //         await addDoc(collection(db, 'savedCars'), {
// //           userId: auth.currentUser.uid,
// //           carId
// //         });
// //         setSavedCarIds(prev => [...prev, carId]);
// //         toast.success('Car saved successfully!');
// //       }
// //     } catch (error) {
// //       console.error('Error toggling car save status:', error);
// //       toast.error('Failed to update car save status.');
// //     }
// //   };

// //   const handleCarClick = (car) => {
// //     navigate(`/map?carId=${car.id}`); // הפניה לדף המפה עם carId כפרמטר
// //   };

// //   const toggleSortOrder = () => {
// //     setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
// //   };
  

// //   const sortCars = (cars) => {
// //     return cars.sort((a, b) => {
// //       let compare = 0;
// //       if (sortKey === 'nearby') {
// //         compare = a.distance - b.distance;
// //       } else if (sortKey === 'category') {
// //         compare = a.category.localeCompare(b.category);
// //       } else if (sortKey === 'seats') {
// //         compare = a.seats - b.seats;
// //       } else if (sortKey === 'year') {
// //         compare = a.year - b.year;
// //       } else if (sortKey === 'fuelType') {
// //         compare = a.fuelType.localeCompare(b.fuelType);
// //       } else if (sortKey === 'battery') {
// //         compare = a.battery - b.battery;
// //       }
// //       return sortOrder === 'asc' ? compare : -compare;
// //     });
// //   };
  

// //   const calculateCarDistances = () => {
// //     let carsWithDistances = cars.map(car => ({
// //       ...car,
// //       distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
// //     }));
// //     return sortCars(carsWithDistances);
// //   };

// //   const formatDistance = (distance) => {
// //     distance = distance.toString(); // Convert distance to string
// //     if (parseFloat(distance) > 1000) {
// //       return (parseFloat(distance) / 1000).toFixed(0) + " km";
// //     } else {
// //       return parseFloat(distance).toFixed(0) + " meter";
// //     }
// //   };
  
// //   const isHybrid = (car) => {
// //     return car.fuelType === 'Hybrid';
// //   };

// //   return (
// //     <div className='listCars-container'>
// //       <ToastContainer />
// //       <div className="listCars-header">
// //         <div className="page-header list-cars-header">
// //           <h1><strong>we</strong> cars</h1> 
// //         </div>

// //         <div className="sort-buttons-container">
// //           <div className="sort-buttons">
// //             <button 
// //               className="sort-order-button" 
// //               onClick={toggleSortOrder}
// //             >
// //               {sortOrder === 'asc' ? <FaRegArrowAltCircleUp/> : <FaRegArrowAltCircleDown/>}
// //             </button>
// //             <button 
// //               className={sortKey === 'nearby' ? 'active' : ''} 
// //               onClick={() => setSortKey('nearby')}
// //             >
// //               <MdMyLocation /> Nearby 
// //             </button>
// //             <button 
// //               className={sortKey === 'category' ? 'active' : ''} 
// //               onClick={() => setSortKey('category')}
// //             >
// //               <FaCarSide /> Category
// //             </button>
// //             <button 
// //               className={sortKey === 'seats' ? 'active' : ''} 
// //               onClick={() => setSortKey('seats')}
// //             >
// //               <PiSeatbeltFill/> Seats
// //             </button>
// //             <button
// //               className={sortKey === 'year' ? 'active' : ''}
// //               onClick={() => setSortKey('year')}
// //             >
// //               <MdDateRange />  Year
// //             </button>
// //             <button 
// //               className={sortKey === 'fuelType' ? 'active' : ''} 
// //               onClick={() => setSortKey('fuelType')}
// //             > 
// //               <BsFuelPumpFill /> Fuel Type
// //             </button>
// //             <button 
// //               className={sortKey === 'battery' ? 'active' : ''} 
// //               onClick={() => setSortKey('battery')}
// //             > 
// //               <MdElectricCar /> Battery
// //             </button>
// //           </div>
// //         </div>

// //       </div>

// //       <div className="cars-list">
// //         {calculateCarDistances().map((car) => (
// //           <>
// //             <div key={car.id} className="car-item">
// //               <div className="car-item-info">
// //                 <div className="car-image-container" onClick={() => handleCarClick(car)}>
// //                   <img src={car.image} alt={`${car.brand} ${car.model}`} />
// //                   {isHybrid(car) && <img src='images/hybrid.png' alt="Hybrid" className="hybrid-badge" />}
// //                 </div>
// //                 <div className="car-details" onClick={() => handleCarClick(car)}  >
// //                   <h3>{`${car.brand} ${car.model}`} {car.year}</h3>
// //                   {car.distance ? (
// //                     <>
// //                       <RiPinDistanceLine />
// //                       <span>{formatDistance(car.distance)}</span>
// //                     </>
// //                   ) : (
// //                     <MdLocationOff /> 
// //                   )}
// //                   <p>
// //                     <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
// //                   </p>
// //                 </div>
// //                 <button onClick={() => saveCar(car.id)} className='saved-bt'>
// //                   {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
// //                 </button>
// //               </div>
// //               <div className="more-details-in-list">
// //                 <div className="item"><FaCarSide /> {car.category} </div>
// //                 <div className="item"><BsFuelPumpFill /> {car.fuelType}</div>
// //                 <div className="item"><MdElectricCar /> {car.battery}</div>
// //                 <div className="item"><PiSeatbeltFill/>  {car.seats}</div>
// //                 <div className="item">{car.addres}</div>
// //               </div>
// //               {/* 
// //               <div className="more-details-button">
// //                 <button class="cssbuttons-io-button">
// //                   more details
// //                   <div class="icon"><svg height="24" width="24"viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg></div>
// //                 </button>
// //               </div> 
// //               */}

// //             </div>
// //           </>
// //         ))}
// //       </div> 
// //     </div>
// //   );
// // };

// // export default withOfflineOverlay(ListCars);














// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import withOfflineOverlay from '../assets/withOfflineOverlay';
// // import { calculateDistance } from '../utils/distanceCalculator';
// // import cars from '../data/carsData';
// // import '../styles/listCars.css';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // import { CiBookmarkPlus } from "react-icons/ci";
// // import { RiPinDistanceLine } from "react-icons/ri";
// // import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation } from "react-icons/md";
// // import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
// // import { PiSeatbeltFill } from "react-icons/pi";

// // import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// // import { auth, db } from '../data/firebaseConfig';
// // import { BsFuelPumpFill } from 'react-icons/bs';

// // const ListCars = () => {
// //   const navigate = useNavigate();
// //   const [savedCarIds, setSavedCarIds] = useState([]);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [sortKey, setSortKey] = useState('nearby');
// //   const [sortOrder, setSortOrder] = useState('asc');

// //   useEffect(() => {
// //     const fetchSavedCarIds = async () => {
// //       if (!auth.currentUser) {
// //         return;
// //       }
// //       try {
// //         const userDoc = doc(db, 'users', auth.currentUser.uid);
// //         const userSnapshot = await getDoc(userDoc);
// //         if (userSnapshot.exists()) {
// //           const userData = userSnapshot.data();
// //           setSavedCarIds(userData.savedCars || []);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching saved car ids:', error);
// //       }
// //     };

// //     const unsubscribe = auth.onAuthStateChanged(user => {
// //       if (user) {
// //         fetchSavedCarIds();
// //       } else {
// //         setSavedCarIds([]);
// //       }
// //     });

// //     const storedLocation = localStorage.getItem('userLocation');
// //     if (storedLocation) {
// //       setUserLocation(JSON.parse(storedLocation));
// //     }

// //     return () => unsubscribe();
// //   }, []);

// //   const isCarSaved = (carId) => savedCarIds.includes(carId);

// //   const saveCar = async (carId) => {
// //     if (!auth.currentUser) {
// //       toast.info('Please log in to save cars.');
// //       return;
// //     }

// //     try {
// //       const userDoc = doc(db, 'users', auth.currentUser.uid);
// //       const userSnapshot = await getDoc(userDoc);

// //       if (userSnapshot.exists()) {
// //         const userData = userSnapshot.data();
// //         let updatedSavedCars;

// //         if (isCarSaved(carId)) {
// //           // Remove the car from saved cars
// //           updatedSavedCars = (userData.savedCars || []).filter(id => id !== carId);
// //           toast.success('Car removed from saved list.');
// //         } else {
// //           // Add the car to saved cars
// //           updatedSavedCars = [...(userData.savedCars || []), carId];
// //           toast.success('Car saved successfully!');
// //         }

// //         await updateDoc(userDoc, { savedCars: updatedSavedCars });
// //         setSavedCarIds(updatedSavedCars);
// //       } else {
// //         // If user document doesn't exist, create it
// //         await setDoc(userDoc, { savedCars: [carId] });
// //         setSavedCarIds([carId]);
// //         toast.success('Car saved successfully!');
// //       }
// //     } catch (error) {
// //       console.error('Error toggling car save status:', error);
// //       toast.error('Failed to update car save status.');
// //     }
// //   };

// //   const handleCarClick = (car) => {
// //     navigate(`/map?carId=${car.id}`);
// //   };

// //   const toggleSortOrder = () => {
// //     setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
// //   };

// //   const sortCars = (cars) => {
// //     return cars.sort((a, b) => {
// //       let compare = 0;
// //       if (sortKey === 'nearby') {
// //         compare = a.distance - b.distance;
// //       } else if (sortKey === 'category') {
// //         compare = a.category.localeCompare(b.category);
// //       } else if (sortKey === 'seats') {
// //         compare = a.seats - b.seats;
// //       } else if (sortKey === 'year') {
// //         compare = a.year - b.year;
// //       } else if (sortKey === 'fuelType') {
// //         compare = a.fuelType.localeCompare(b.fuelType);
// //       } else if (sortKey === 'battery') {
// //         compare = a.battery - b.battery;
// //       }
// //       return sortOrder === 'asc' ? compare : -compare;
// //     });
// //   };

// //   const calculateCarDistances = () => {
// //     let carsWithDistances = cars.map(car => ({
// //       ...car,
// //       distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
// //     }));
// //     return sortCars(carsWithDistances);
// //   };

// //   const formatDistance = (distance) => {
// //     distance = distance.toString();
// //     if (parseFloat(distance) > 1000) {
// //       return (parseFloat(distance) / 1000).toFixed(0) + " km";
// //     } else {
// //       return parseFloat(distance).toFixed(0) + " meter";
// //     }
// //   };
  
// //   const isHybrid = (car) => {
// //     return car.fuelType === 'Hybrid';
// //   };

// //   return (
// //     <div className='listCars-container'>
// //       <ToastContainer />
// //       <div className="listCars-header">
// //         <div className="page-header list-cars-header">
// //           <h1><strong>we</strong> cars</h1> 
// //         </div>

// //         <div className="sort-buttons-container">
// //           <div className="sort-buttons">
// //             <button 
// //               className="sort-order-button" 
// //               onClick={toggleSortOrder}
// //             >
// //               {sortOrder === 'asc' ? <FaRegArrowAltCircleUp/> : <FaRegArrowAltCircleDown/>}
// //             </button>
// //             <button 
// //               className={sortKey === 'nearby' ? 'active' : ''} 
// //               onClick={() => setSortKey('nearby')}
// //             >
// //               <MdMyLocation /> Nearby 
// //             </button>
// //             <button 
// //               className={sortKey === 'category' ? 'active' : ''} 
// //               onClick={() => setSortKey('category')}
// //             >
// //               <FaCarSide /> Category
// //             </button>
// //             <button 
// //               className={sortKey === 'seats' ? 'active' : ''} 
// //               onClick={() => setSortKey('seats')}
// //             >
// //               <PiSeatbeltFill/> Seats
// //             </button>
// //             <button
// //               className={sortKey === 'year' ? 'active' : ''}
// //               onClick={() => setSortKey('year')}
// //             >
// //               <MdDateRange />  Year
// //             </button>
// //             <button 
// //               className={sortKey === 'fuelType' ? 'active' : ''} 
// //               onClick={() => setSortKey('fuelType')}
// //             > 
// //               <BsFuelPumpFill /> Fuel Type
// //             </button>
// //             <button 
// //               className={sortKey === 'battery' ? 'active' : ''} 
// //               onClick={() => setSortKey('battery')}
// //             > 
// //               <MdElectricCar /> Battery
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="cars-list">
// //         {calculateCarDistances().map((car) => (
// //           <div key={car.id} className="car-item">
// //             <div className="car-item-info">
// //               <div className="car-image-container" onClick={() => handleCarClick(car)}>
// //                 <img src={car.image} alt={`${car.brand} ${car.model}`} />
// //                 {isHybrid(car) && <img src='images/hybrid.png' alt="Hybrid" className="hybrid-badge" />}
// //               </div>
// //               <div className="car-details" onClick={() => handleCarClick(car)}>
// //                 <h3>{`${car.brand} ${car.model}`} {car.year}</h3>
// //                 {car.distance ? (
// //                   <>
// //                     <RiPinDistanceLine />
// //                     <span>{formatDistance(car.distance)}</span>
// //                   </>
// //                 ) : (
// //                   <MdLocationOff /> 
// //                 )}
// //                 <p>
// //                   <span>{Math.floor(car.pricePerHour)} ₪/hour</span>
// //                 </p>
// //               </div>
// //               <button onClick={() => saveCar(car.id)} className='saved-bt'>
// //                 {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
// //               </button>
// //             </div>
// //             <div className="more-details-in-list">
// //               <div className="item"><FaCarSide /> {car.category} </div>
// //               <div className="item"><BsFuelPumpFill /> {car.fuelType}</div>
// //               <div className="item"><MdElectricCar /> {car.battery}</div>
// //               <div className="item"><PiSeatbeltFill/>  {car.seats}</div>
// //               <div className="item">{car.addres}</div>
// //             </div>
// //           </div>
// //         ))}
// //       </div> 
// //     </div>
// //   );
// // };

// // export default withOfflineOverlay(ListCars);


















// import React, { useState, useEffect } from 'react';
// import { fetchCarsFromFirebase } from '../data/fetchCars';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import withOfflineOverlay from '../assets/withOfflineOverlay';
// import { calculateDistance } from '../utils/distanceCalculator';
// // import cars from '../data/carsData';
// import '../styles/listCars.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { CiBookmarkPlus } from "react-icons/ci";
// import { RiPinDistanceLine } from "react-icons/ri";
// import { MdBookmarkAdded, MdDateRange, MdElectricCar, MdLocationOff, MdMyLocation } from "react-icons/md";
// import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaCarSide } from "react-icons/fa";
// import { PiSeatbeltFill } from "react-icons/pi";
// import LoadingPage from '../assets/LoadingPage';

// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from '../data/firebaseConfig';
// import { BsFuelPumpFill } from 'react-icons/bs';

// const ListCars = () => {
//   const [cars, setCars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const [savedCarIds, setSavedCarIds] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [sortKey, setSortKey] = useState('nearby');
//   const [sortOrder, setSortOrder] = useState('asc');


//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const fetchedCars = await fetchCarsFromFirebase();
//         setCars(fetchedCars);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//         setIsLoading(false);
//         toast.error(t('Failed to load cars. Please try again.'));
//       }
//     };
  
//     fetchCars();
//   }, [t]);


//   useEffect(() => {
//     const fetchSavedCarIds = async () => {
//       if (!auth.currentUser) {
//         return;
//       }
//       try {
//         const userDoc = doc(db, 'users', auth.currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           const userData = userSnapshot.data();
//           setSavedCarIds(userData.savedCars || []);
//         }
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
//       setUserLocation(JSON.parse(storedLocation));
//     }

//     return () => unsubscribe();
//   }, []);

//   const isCarSaved = (carId) => savedCarIds.includes(carId);

//   const saveCar = async (carId) => {
//     if (!auth.currentUser) {
//       toast.info(t('Please log in to save cars.'));
//       return;
//     }

//     try {
//       const userDoc = doc(db, 'users', auth.currentUser.uid);
//       const userSnapshot = await getDoc(userDoc);

//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.data();
//         let updatedSavedCars;

//         if (isCarSaved(carId)) {
//           updatedSavedCars = (userData.savedCars || []).filter(id => id !== carId);
//           toast.success(t('Car removed from saved list.'), {
//             position: "top-center",  // מיקום במרכז העליון של המסך
//             autoClose: 1500,  // ההודעה תיסגר לאחר 2 שניות (2000 מילישניות)
//             hideProgressBar: true,  // הסתרת בר התקדמות
//             closeOnClick: true,  // סגירה על קליק
//             pauseOnHover: true,  // השהייה כאשר מעבירים את העכבר
//             draggable: true,  // מאפשר גרירה
//             progress: undefined,  // הגדרה דינמית של התקדמות
//           });
    
//         } else {
//           updatedSavedCars = [...(userData.savedCars || []), carId];
//           toast.success(t('Car saved successfully'), {
//             position: "top-center",  // מיקום במרכז העליון של המסך
//             autoClose: 1500,  // ההודעה תיסגר לאחר 2 שניות (2000 מילישניות)
//             hideProgressBar: true,  // הסתרת בר התקדמות
//             closeOnClick: true,  // סגירה על קליק
//             pauseOnHover: true,  // השהייה כאשר מעבירים את העכבר
//             draggable: true,  // מאפשר גרירה
//             progress: undefined,  // הגדרה דינמית של התקדמות
//           });
    
//         }

//         await updateDoc(userDoc, { savedCars: updatedSavedCars });
//         setSavedCarIds(updatedSavedCars);
//       } else {
//         await setDoc(userDoc, { savedCars: [carId] });
//         setSavedCarIds([carId]);
//         toast.success(t('Car saved successfully'), {
//           position: "top-center",  // מיקום במרכז העליון של המסך
//           autoClose: 1500,  // ההודעה תיסגר לאחר 2 שניות (2000 מילישניות)
//           hideProgressBar: true,  // הסתרת בר התקדמות
//           closeOnClick: true,  // סגירה על קליק
//           pauseOnHover: true,  // השהייה כאשר מעבירים את העכבר
//           draggable: true,  // מאפשר גרירה
//           progress: undefined,  // הגדרה דינמית של התקדמות
//         });
  
//       }
//     } catch (error) {
//       console.error('Error toggling car save status:', error);
//       toast.error(t('Failed to update car save status.'));
//     }
//   };

//   const handleCarClick = (car) => {
//     navigate(`/map?carId=${car.id}`);
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
//     distance = distance.toString();
//     if (parseFloat(distance) > 1000) {
//       return t('{{distance}} km', { distance: (parseFloat(distance) / 1000).toFixed(0) });
//     } else {
//       return t('{{distance}} meter', { distance: parseFloat(distance).toFixed(0) });
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
//           <h1><strong>{t('we')}</strong> {t('cars')}</h1> 
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
//               <MdMyLocation /> {t('Nearby')}
//             </button>
//             <button 
//               className={sortKey === 'category' ? 'active' : ''} 
//               onClick={() => setSortKey('category')}
//             >
//               <FaCarSide /> {t('Category')}
//             </button>
//             <button 
//               className={sortKey === 'seats' ? 'active' : ''} 
//               onClick={() => setSortKey('seats')}
//             >
//               <PiSeatbeltFill/> {t('Seats')}
//             </button>
//             <button
//               className={sortKey === 'year' ? 'active' : ''}
//               onClick={() => setSortKey('year')}
//             >
//               <MdDateRange /> {t('Year')}
//             </button>
//             <button 
//               className={sortKey === 'fuelType' ? 'active' : ''} 
//               onClick={() => setSortKey('fuelType')}
//             > 
//               <BsFuelPumpFill /> {t('Fuel Type')}
//             </button>
//             <button 
//               className={sortKey === 'battery' ? 'active' : ''} 
//               onClick={() => setSortKey('battery')}
//             > 
//               <MdElectricCar /> {t('Battery')}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="loading-container">
//           <LoadingPage />
//         </div>
//       ) : (
//         <div className="cars-list">
//           {calculateCarDistances().map((car) => (
//             <div key={car.id} className="car-item">
//               <div className="car-item-info">
//                 <div className="car-image-container" onClick={() => handleCarClick(car)}>
//                   <img src={car.image} alt={t('{{brand}} {{model}}', { brand: car.brand, model: car.model })} />
//                   {isHybrid(car) && <img src='images/hybrid.png' alt={t('Hybrid')} className="hybrid-badge" />}
//                 </div>
//                 <div className="car-details" onClick={() => handleCarClick(car)}>
//                   <h3>{t('{{brand}} {{model}} {{year}}', { brand: car.brand, model: car.model, year: car.year })}</h3>
//                   {car.distance ? (
//                     <>
//                       <RiPinDistanceLine />
//                       <span>{formatDistance(car.distance)}</span>
//                     </>
//                   ) : (
//                     <MdLocationOff /> 
//                   )}
//                   <p>
//                     <span>{t('{{price}} ₪/hour', { price: Math.floor(car.pricePerHour) })}</span>
//                   </p>
//                 </div>
//                 <button onClick={() => saveCar(car.id)} className='saved-bt'>
//                   {isCarSaved(car.id) ? <MdBookmarkAdded /> : <CiBookmarkPlus />}
//                 </button>
//               </div>
//               <div className="more-details-in-list">
//                 <div className="item"><FaCarSide /> {t(car.category)} </div>
//                 <div className="item"><BsFuelPumpFill /> {t(car.fuelType)}</div>
//                 <div className="item"><MdElectricCar /> {car.battery}</div>
//                 <div className="item"><PiSeatbeltFill/> {t('{{seats}} seats', { seats: car.seats })}</div>
//                 <div className="item">{t(car.addres)}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default withOfflineOverlay(ListCars);













import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchCarsFromFirebase } from '../data/fetchCars';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import { calculateDistance } from '../utils/distanceCalculator';
import '../styles/listCars.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
const USER_LOCATION_KEY = 'userLocation';

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

  const sortCars = useCallback((cars) => {
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
  }, [sortKey, sortOrder]);

  const calculateCarDistances = useCallback(() => {
    let carsWithDistances = cars.map(car => ({
      ...car,
      distance: userLocation ? calculateDistance(userLocation, car.coordinates) : null
    }));
    return sortCars(carsWithDistances);
  }, [cars, userLocation, sortCars]);

  const formatDistance = useCallback((distance) => {
    distance = distance.toString();
    if (parseFloat(distance) > 1000) {
      return t('{{distance}} km', { distance: (parseFloat(distance) / 1000).toFixed(0) });
    } else {
      return t('{{distance}} meter', { distance: parseFloat(distance).toFixed(0) });
    }
  }, [t]);

  const isHybrid = useCallback((car) => {
    return car.fuelType === 'Hybrid';
  }, []);

  const sortedCars = useMemo(() => calculateCarDistances(), [calculateCarDistances]);

  const renderCarItem = useCallback((car) => (
    <div key={car.id} className="car-item">
      <div className="car-item-info">
        <div className="car-image-container" onClick={() => handleCarClick(car)}>
          <img src={car.image} alt={t('{{brand}} {{model}}', { brand: car.brand, model: car.model })} />
          {isHybrid(car) && <img src='images/hybrid.png' alt={t('Hybrid')} className="hybrid-badge" />}
        </div>
        <div className="car-details" onClick={() => handleCarClick(car)}>
          <h3>{t('{{brand}} {{model}} {{year}}', { brand: car.brand, model: car.model, year: car.year })}</h3>
          {car.distance ? (
            <>
              <RiPinDistanceLine />
              <span>{formatDistance(car.distance)}</span>
            </>
          ) : (
            <MdLocationOff /> 
          )}
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
        <div className="item">{t(car.addres)}</div>
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