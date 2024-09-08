// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import '../styles/CarManager.css';
// import Swal from 'sweetalert2';

// import { db } from '../data/firebaseConfig';
// import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

// const CarManager = () => {
//   const { t } = useTranslation();
//   const [cars, setCars] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchCars();
//     }
//   }, [isAuthenticated]);

//   const fetchCars = async () => {
//     try {
//       const carsCollection = collection(db, 'cars');
//       const carsSnapshot = await getDocs(carsCollection);
//       const carsList = carsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//       setCars(carsList);
//     } catch (error) {
//       console.error('Error fetching cars:', error);
//       Swal.fire({
//         icon: 'error',
//         title: t('Error'),
//         text: t('Failed to fetch cars'),
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
//       setIsAuthenticated(true);
//       Swal.fire({
//         icon: 'success',
//         title: t('Logged In'),
//         text: t('You have successfully logged in'),
//       });
//     } else {
//       Swal.fire({
//         icon: 'error',
//         title: t('Invalid Password'),
//         text: t('Please try again'),
//       });
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setPassword('');
//     Swal.fire({
//       icon: 'success',
//       title: t('Logged Out'),
//       text: t('You have been logged out'),
//     });
//   };

//   const handleEdit = (car) => {
//     setSelectedCar(car);
//     setIsEditing(true);
//   };

// //   const handleSave = async () => {
// //     if (selectedCar) {
// //       try {
// //         const carRef = doc(db, 'cars', selectedCar.id.toString());
// //         await setDoc(carRef, selectedCar, { merge: true });
        
// //         setCars(prevCars => prevCars.map(car => car.id === selectedCar.id ? selectedCar : car));
// //         setIsEditing(false);
// //         setSelectedCar(null);
        
// //         Swal.fire({
// //           icon: 'success',
// //           title: t('Saved'),
// //           text: t('Car has been saved successfully'),
// //         });
// //       } catch (error) {
// //         console.error('Error saving car:', error);
// //         Swal.fire({
// //           icon: 'error',
// //           title: t('Error'),
// //           text: t('Failed to save car: ') + error.message,
// //         });
// //       }
// //     }
// //   };


//     const handleSave = async () => {
//         if (selectedCar) {
//         try {
//             const carRef = doc(db, 'cars', selectedCar.id.toString());
//             await setDoc(carRef, selectedCar, { merge: true });
            
//             setCars(prevCars => {
//             const updatedCars = prevCars.filter(car => car.id !== selectedCar.id);
//             return [...updatedCars, selectedCar];
//             });
//             setIsEditing(false);
//             setSelectedCar(null);
            
//             Swal.fire({
//             icon: 'success',
//             title: t('Saved'),
//             text: t('Car has been saved successfully'),
//             });
//         } catch (error) {
//             console.error('Error saving car:', error);
//             Swal.fire({
//             icon: 'error',
//             title: t('Error'),
//             text: t('Failed to save car: ') + error.message,
//             });
//         }
//         }
//     };

//   const handleDelete = async () => {
//     if (selectedCar) {
//       try {
//         const carRef = doc(db, 'cars', selectedCar.id.toString());
//         await deleteDoc(carRef);
//         setCars(cars.filter(car => car.id !== selectedCar.id));
//         setSelectedCar(null);
//         Swal.fire({
//           icon: 'success',
//           title: t('Deleted'),
//           text: t('Car has been deleted successfully'),
//         });
//       } catch (error) {
//         console.error('Error deleting car:', error);
//         Swal.fire({
//           icon: 'error',
//           title: t('Error'),
//           text: t('Failed to delete car'),
//         });
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSelectedCar(prev => {
//       const updatedCar = { ...prev };
//       if (name.includes('.')) {
//         const [objName, key] = name.split('.');
//         updatedCar[objName] = {
//           ...updatedCar[objName],
//           [key]: type === 'number' ? parseFloat(value) : value
//         };
//       } else {
//         updatedCar[name] = type === 'checkbox' ? checked : 
//                            type === 'number' ? parseFloat(value) : value;
//       }
//       return updatedCar;
//     });
//   };

//   const filteredCars = cars.filter(car => {
//     const searchTerm = searchQuery.toLowerCase();
//     return Object.values(car).some(value => 
//       typeof value === 'string' && value.toLowerCase().includes(searchTerm)
//     ) || 
//     (car.address && Object.values(car.address).some(value => 
//       typeof value === 'string' && value.toLowerCase().includes(searchTerm)
//     )) ||
//     (car.coordinates && Object.values(car.coordinates).some(value => 
//       value.toString().toLowerCase().includes(searchTerm)
//     ));
//   });

//   if (!isAuthenticated) {
//     return (
//       <div className="car-manager">
//         <h1>{t('Admin Login')}</h1>
//         <form onSubmit={handleLogin} className="login-form">
//           <div className="form-group">
//             <label htmlFor="password">{t('Password')}</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-btn">{t('Login')}</button>
//         </form>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <div className="loading">{t('Loading...')}</div>;
//   }

//   return (
//     <div className="car-manager">
//       <div className="header">
//         <h1>{t('Car Manager')}</h1>
//         <button onClick={handleLogout} className="logout-btn">{t('Logout')}</button>
//       </div>
      
//       {!selectedCar ? (
//         <div className="car-list">

//             <div className="search-container">
//             <input
//                 type="text"
//                 placeholder={t('Search cars...')}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="search-input"
//             />
//             </div>

//             <button className="add-car-btn" onClick={() => {
//                 setSelectedCar({ 
//                     id: '',
//                     address: { city: '', street: '' }, 
//                     coordinates: { lat: 0, lng: 0 },
//                     isAvailable: true 
//                 });
//                 setSearchQuery('');
//                 }}>
//                 {t('Add New Car')}
//             </button>

//           {filteredCars.map(car => (
//             <div key={car.id} className="car-item">
//               <div className="car-info">
//                 <img src={car.image || '/placeholder.svg?height=100&width=100'} alt={`${car.brand} ${car.model}`} />
//                 <div>
//                   <h2>{car.brand} {car.model}</h2>
//                   <p>{car.year} - {car.category}</p>
//                   <p>{car.address.city}, {car.address.street}</p>
//                 </div>
//               </div>
//               <button className="edit-btn" onClick={() => handleEdit(car)}>
//                 {t('Edit')}
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="car-edit">
//           <button className="back-btn" onClick={() => { setSelectedCar(null); setIsEditing(false); }}>
//             {t('Back')}
//           </button>
//           <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            // <div className="form-group">
            //   <label htmlFor="id">{t('Car ID')}</label>
            //   <input id="id" name="id" value={selectedCar.id || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="brand">{t('Brand')}</label>
            //   <input id="brand" name="brand" value={selectedCar.brand || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="model">{t('Model')}</label>
            //   <input id="model" name="model" value={selectedCar.model || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="year">{t('Year')}</label>
            //   <input id="year" name="year" type="number" value={selectedCar.year || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="category">{t('Category')}</label>
            //   <input id="category" name="category" value={selectedCar.category || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="address.city">{t('City')}</label>
            //   <input id="address.city" name="address.city" value={selectedCar.address?.city || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="address.street">{t('Street')}</label>
            //   <input id="address.street" name="address.street" value={selectedCar.address?.street || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="coordinates.lat">{t('Latitude')}</label>
            //   <input id="coordinates.lat" name="coordinates.lat" type="number" value={selectedCar.coordinates?.lat || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="coordinates.lng">{t('Longitude')}</label>
            //   <input id="coordinates.lng" name="coordinates.lng" type="number" value={selectedCar.coordinates?.lng || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="battery">{t('Battery')}</label>
            //   <input id="battery" name="battery" value={selectedCar.battery || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="fuel">{t('Fuel')}</label>
            //   <input id="fuel" name="fuel" value={selectedCar.fuel || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="fuelType">{t('Fuel Type')}</label>
            //   <input id="fuelType" name="fuelType" value={selectedCar.fuelType || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="kmPrice">{t('Price per KM')}</label>
            //   <input id="kmPrice" name="kmPrice" type="number" value={selectedCar.kmPrice || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="pricePerHour">{t('Price per Hour')}</label>
            //   <input id="pricePerHour" name="pricePerHour" type="number" value={selectedCar.pricePerHour || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="pricePerDay">{t('Price per Day')}</label>
            //   <input id="pricePerDay" name="pricePerDay" type="number" value={selectedCar.pricePerDay || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="seats">{t('Seats')}</label>
            //   <input id="seats" name="seats" type="number" value={selectedCar.seats || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="unlockFee">{t('Unlock Fee')}</label>
            //   <input id="unlockFee" name="unlockFee" type="number" value={selectedCar.unlockFee || ''} onChange={handleInputChange} required />
            // </div>
            // <div className="form-group">
            //   <label htmlFor="image">{t('Main Image URL')}</label>
            //   <input id="image" name="image" value={selectedCar.image || ''} onChange={handleInputChange} required />
            // </div>
            // {[1, 2, 3, 4, 5].map((num) => (
            //   <div key={num} className="form-group">
            //     <label htmlFor={`image${num}`}>{t(`Image ${num} URL`)}</label>
            //     <input id={`image${num}`} name={`image${num}`} value={selectedCar[`image${num}`] || ''} onChange={handleInputChange} />
            //   </div>
            // ))}
//             <div className="form-actions">
//               <button type="submit">{t('Save')}</button>
//               {selectedCar.id && (
//                 <button type="button" className="delete-btn" onClick={() => {
//                   Swal.fire({
//                     title: t('Are you sure?'),
//                     text: t('You won\'t be able to revert this!'),
//                     icon: 'warning',
//                     showCancelButton: true,
//                     confirmButtonColor: '#3085d6',
//                     cancelButtonColor: '#d33',
//                     confirmButtonText: t('Yes, delete it!')
//                   }).then((result) => {
//                     if (result.isConfirmed) {
//                       handleDelete();
//                     }
//                   });
//                 }}>
//                   {t('Delete')}
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarManager;



























import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CarManager.css';
import Swal from 'sweetalert2';
import { db } from '../data/firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const CARS_CACHE_KEY = 'cachedCars';

const CarManager = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = useCallback(async () => {
    try {
      const cachedCars = localStorage.getItem(CARS_CACHE_KEY);
      if (cachedCars) {
        setCars(JSON.parse(cachedCars));
        setIsLoading(false);
        return;
      }

      const carsCollection = collection(db, 'cars');
      const carsSnapshot = await getDocs(carsCollection);
      const carsList = carsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setCars(carsList);
      localStorage.setItem(CARS_CACHE_KEY, JSON.stringify(carsList));
    } catch (error) {
      console.error('Error fetching cars:', error);
      Swal.fire({
        icon: 'error',
        title: t('Error'),
        text: t('Failed to fetch cars'),
      });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCars();
    }
  }, [isAuthenticated, fetchCars]);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      Swal.fire({
        icon: 'success',
        title: t('Logged In'),
        text: t('You have successfully logged in'),
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: t('Invalid Password'),
        text: t('Please try again'),
      });
    }
  }, [password, t]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setPassword('');
    Swal.fire({
      icon: 'success',
      title: t('Logged Out'),
      text: t('You have been logged out'),
    });
  }, [t]);

  const handleSave = useCallback(async () => {
    if (selectedCar) {
      try {
        const carRef = doc(db, 'cars', selectedCar.id.toString());
        await setDoc(carRef, selectedCar, { merge: true });
        
        setCars(prevCars => {
          const updatedCars = prevCars.map(car => 
            car.id === selectedCar.id ? selectedCar : car
          );
          localStorage.setItem(CARS_CACHE_KEY, JSON.stringify(updatedCars));
          return updatedCars;
        });
        setSelectedCar(null);
        
        Swal.fire({
          icon: 'success',
          title: t('Saved'),
          text: t('Car has been saved successfully'),
        });
      } catch (error) {
        console.error('Error saving car:', error);
        Swal.fire({
          icon: 'error',
          title: t('Error'),
          text: t('Failed to save car: ') + error.message,
        });
      }
    }
  }, [selectedCar, t]);

  const handleDelete = useCallback(async () => {
    if (selectedCar) {
      try {
        const carRef = doc(db, 'cars', selectedCar.id.toString());
        await deleteDoc(carRef);
        setCars(prevCars => {
          const updatedCars = prevCars.filter(car => car.id !== selectedCar.id);
          localStorage.setItem(CARS_CACHE_KEY, JSON.stringify(updatedCars));
          return updatedCars;
        });
        setSelectedCar(null);
        Swal.fire({
          icon: 'success',
          title: t('Deleted'),
          text: t('Car has been deleted successfully'),
        });
      } catch (error) {
        console.error('Error deleting car:', error);
        Swal.fire({
          icon: 'error',
          title: t('Error'),
          text: t('Failed to delete car'),
        });
      }
    }
  }, [selectedCar, t]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setSelectedCar(prev => {
      const updatedCar = { ...prev };
      if (name.includes('.')) {
        const [objName, key] = name.split('.');
        updatedCar[objName] = {
          ...updatedCar[objName],
          [key]: type === 'number' ? parseFloat(value) : value
        };
      } else {
        updatedCar[name] = type === 'checkbox' ? checked : 
                           type === 'number' ? parseFloat(value) : value;
      }
      return updatedCar;
    });
  }, []);

  const filteredCars = useMemo(() => {
    const searchTerm = searchQuery.toLowerCase();
    return cars.filter(car => {
      return Object.values(car).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      ) || 
      (car.address && Object.values(car.address).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchTerm)
      )) ||
      (car.coordinates && Object.values(car.coordinates).some(value => 
        value.toString().toLowerCase().includes(searchTerm)
      ));
    });
  }, [cars, searchQuery]);

  if (!isAuthenticated) {
    return (
      <div className="car-manager">
        <h1>{t('Admin Login')}</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="password">{t('Password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">{t('Login')}</button>
        </form>
      </div>
    );
  }

  if (isLoading) {
    return <div className="loading">{t('Loading...')}</div>;
  }

  return (
    <div className="car-manager">
      <div className="header">
        <h1>{t('Car Manager')}</h1>
        <button onClick={handleLogout} className="logout-btn">{t('Logout')}</button>
      </div>
      
      {!selectedCar ? (
        <CarList 
          filteredCars={filteredCars}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedCar={setSelectedCar}
          handleEdit={setSelectedCar}
          t={t}
        />
      ) : (
        <CarEdit 
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleDelete={handleDelete}
          t={t}
        />
      )}
    </div>
  );
};

const CarList = React.memo(({ filteredCars, searchQuery, setSearchQuery, setSelectedCar, handleEdit, t }) => (
  <div className="car-list">
    <div className="search-container">
      <input
        type="text"
        placeholder={t('Search cars...')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
    </div>
    <button className="add-car-btn" onClick={() => {
      setSelectedCar({ 
        id: '',
        address: { city: '', street: '' }, 
        coordinates: { lat: 0, lng: 0 },
        isAvailable: true 
      });
      setSearchQuery('');
    }}>
      {t('Add New Car')}
    </button>
    {filteredCars.map(car => (
      <div key={car.id} className="car-item">
        <div className="car-info">
          <img src={car.image || '/placeholder.svg?height=100&width=100'} alt={`${car.brand} ${car.model}`} />
          <div>
            <h2>{car.brand} {car.model}</h2>
            <p>{car.year} - {car.category}</p>
            <p>{car.address.city}, {car.address.street}</p>
          </div>
        </div>
        <button className="edit-btn" onClick={() => handleEdit(car)}>
          {t('Edit')}
        </button>
      </div>
    ))}
  </div>
));

const CarEdit = React.memo(({ selectedCar, setSelectedCar, handleInputChange, handleSave, handleDelete, t }) => (
  <div className="car-edit">
    <button className="back-btn" onClick={() => setSelectedCar(null)}>
      {t('Back')}
    </button>
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
    <div className="form-group">
              <label htmlFor="id">{t('Car ID')}</label>
              <input id="id" name="id" value={selectedCar.id || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="brand">{t('Brand')}</label>
              <input id="brand" name="brand" value={selectedCar.brand || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="model">{t('Model')}</label>
              <input id="model" name="model" value={selectedCar.model || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="year">{t('Year')}</label>
              <input id="year" name="year" type="number" value={selectedCar.year || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="category">{t('Category')}</label>
              <input id="category" name="category" value={selectedCar.category || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address.city">{t('City')}</label>
              <input id="address.city" name="address.city" value={selectedCar.address?.city || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address.street">{t('Street')}</label>
              <input id="address.street" name="address.street" value={selectedCar.address?.street || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="coordinates.lat">{t('Latitude')}</label>
              <input id="coordinates.lat" name="coordinates.lat" type="number" value={selectedCar.coordinates?.lat || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="coordinates.lng">{t('Longitude')}</label>
              <input id="coordinates.lng" name="coordinates.lng" type="number" value={selectedCar.coordinates?.lng || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="battery">{t('Battery')}</label>
              <input id="battery" name="battery" value={selectedCar.battery || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fuel">{t('Fuel')}</label>
              <input id="fuel" name="fuel" value={selectedCar.fuel || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fuelType">{t('Fuel Type')}</label>
              <input id="fuelType" name="fuelType" value={selectedCar.fuelType || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="kmPrice">{t('Price per KM')}</label>
              <input id="kmPrice" name="kmPrice" type="number" value={selectedCar.kmPrice || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="pricePerHour">{t('Price per Hour')}</label>
              <input id="pricePerHour" name="pricePerHour" type="number" value={selectedCar.pricePerHour || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="pricePerDay">{t('Price per Day')}</label>
              <input id="pricePerDay" name="pricePerDay" type="number" value={selectedCar.pricePerDay || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="seats">{t('Seats')}</label>
              <input id="seats" name="seats" type="number" value={selectedCar.seats || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="unlockFee">{t('Unlock Fee')}</label>
              <input id="unlockFee" name="unlockFee" type="number" value={selectedCar.unlockFee || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">{t('Main Image URL')}</label>
              <input id="image" name="image" value={selectedCar.image || ''} onChange={handleInputChange} required />
            </div>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="form-group">
                <label htmlFor={`image${num}`}>{t(`Image ${num} URL`)}</label>
                <input id={`image${num}`} name={`image${num}`} value={selectedCar[`image${num}`] || ''} onChange={handleInputChange} />
              </div>
            ))}
      <div className="form-actions">
        <button type="submit">{t('Save')}</button>
        {selectedCar.id && (
          <button type="button" className="delete-btn" onClick={() => {
            Swal.fire({
              title: t('Are you sure?'),
              text: t('You won\'t be able to revert this!'),
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: t('Yes, delete it!')
            }).then((result) => {
              if (result.isConfirmed) {
                handleDelete();
              }
            });
          }}>
            {t('Delete')}
          </button>
        )}
      </div>
    </form>
  </div>
));

export default CarManager;




// **שימוש במטמון מקומי**: הוספנו שימוש ב-`localStorage` עם מפתח `CARS_CACHE_KEY` לשמירה וקריאה של רשימת המכוניות.
// **אופטימיזציה של פונקציות**: השתמשנו ב-`useCallback` עבור פונקציות כמו `handleLogin`, `handleLogout`, `handleSave`, `handleDelete`, ו-`handleInputChange` כדי למנוע יצירה מחדש של הפונקציות בכל רינדור.
// **שימוש ב-`useMemo`**: אופטימזנו את `filteredCars` באמצעות `useMemo` כדי למנוע חישוב מחדש של הרשימה המסוננת בכל רינדור.
// **פיצול הקומפוננטה**: פיצלנו את `CarList` ו-`CarEdit` לקומפוננטות נפרדות ועטפנו אותן ב-`React.memo` כדי למנוע רינדורים מיותרים.
// **עדכון מטמון בשמירת שינויים**: בעת שמירת או מחיקת מכונית, אנו מעדכנים גם את המטמון המקומי.
// **שיפור בטיפול בשגיאות**: הוספנו טיפול בשגיאות עקבי בכל הפעולות שמתקשרות עם Firestore.
// **שיפור ביצועים**: השתמשנו ב-`map` במקום `filter` בעת עדכון מכונית, מה שמשפר את הביצועים עבור רשימות גדולות.