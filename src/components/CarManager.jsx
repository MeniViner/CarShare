import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/CarManager.css';

import { db } from '../data/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

const CarManager = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchCars();
    }
  }, [isAuthenticated]);

  const fetchCars = async () => {
    try {
      const carsCollection = collection(db, 'cars');
      const carsSnapshot = await getDocs(carsCollection);
      const carsList = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carsList);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert(t('Invalid password'));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (selectedCar) {
      try {
        if (selectedCar.id === 'new') {
          await addDoc(collection(db, 'cars'), selectedCar);
        } else {
          const carRef = doc(db, 'cars', selectedCar.id);
          await updateDoc(carRef, selectedCar);
        }
        const updatedCars = selectedCar.id === 'new' 
          ? [...cars, selectedCar] 
          : cars.map(car => car.id === selectedCar.id ? selectedCar : car);
        setCars(updatedCars);
        setIsEditing(false);
        setSelectedCar(null);
      } catch (error) {
        console.error('Error saving car:', error);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedCar) {
      try {
        const carRef = doc(db, 'cars', selectedCar.id);
        await deleteDoc(carRef);
        setCars(cars.filter(car => car.id !== selectedCar.id));
        setIsDeleteDialogOpen(false);
        setSelectedCar(null);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedCar(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
        <div className="car-list">
          <button className="add-car-btn" onClick={() => setSelectedCar({ id: 'new', isAvailable: true })}>
            {t('Add New Car')}
          </button>
          {cars.map(car => (
            <div key={car.id} className="car-item">
              <div className="car-info">
                <img src={car.image || '/placeholder.svg?height=100&width=100'} alt={`${car.brand} ${car.model}`} />
                <div>
                  <h2>{car.brand} {car.model}</h2>
                  <p>{car.year}</p>
                </div>
              </div>
              <button className="edit-btn" onClick={() => handleEdit(car)}>
                {t('Edit')}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="car-edit">
          <button className="back-btn" onClick={() => { setSelectedCar(null); setIsEditing(false); }}>
            {t('Back')}
          </button>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
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
              <label htmlFor="pricePerHour">{t('Price per Hour')}</label>
              <input id="pricePerHour" name="pricePerHour" type="number" value={selectedCar.pricePerHour || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="pricePerDay">{t('Price per Day')}</label>
              <input id="pricePerDay" name="pricePerDay" type="number" value={selectedCar.pricePerDay || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="fuelLevel">{t('Fuel Level')}</label>
              <input id="fuelLevel" name="fuelLevel" type="number" value={selectedCar.fuelLevel || ''} onChange={handleInputChange} required />
            </div>
            <div className="form-group checkbox">
              <input id="isAvailable" name="isAvailable" type="checkbox" checked={selectedCar.isAvailable} onChange={handleInputChange} />
              <label htmlFor="isAvailable">{t('Available')}</label>
            </div>
            <div className="form-actions">
              <button type="submit">{t('Save')}</button>
              {selectedCar.id !== 'new' && (
                <button type="button" className="delete-btn" onClick={() => setIsDeleteDialogOpen(true)}>
                  {t('Delete')}
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {isDeleteDialogOpen && (
        <div className="delete-dialog">
          <div className="delete-dialog-content">
            <h2>{t('Are you sure?')}</h2>
            <p>{t('This action cannot be undone. This will permanently delete the car from the database.')}</p>
            <div className="delete-dialog-actions">
              <button onClick={() => setIsDeleteDialogOpen(false)}>{t('Cancel')}</button>
              <button onClick={handleDelete}>{t('Delete')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarManager;