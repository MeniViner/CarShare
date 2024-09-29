import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { auth, db } from '../data/firebaseConfig';
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { fetchCarsFromFirebase } from '../data/fetchCars';

import LoadingPage from '../assets/LoadingPage';
import Swal from 'sweetalert2';
import { FaCar, FaChargingStation } from "react-icons/fa";
import { MdBookmarkRemove, MdNoAccounts, MdOutlineSaveAlt, MdElectricCar, MdLocalGasStation } from "react-icons/md";
import '../styles/saved.css';


const Saved = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [savedCarIds, setSavedCarIds] = useState([]);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    const fetchSavedCarIds = useCallback(async () => {
        if (!auth.currentUser) {
            return;
        }
        try {
            const userDoc = doc(db, 'users', auth.currentUser.uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setSavedCarIds(userData.savedCars || []);
            }
        } catch (error) {
            console.error('Error fetching saved car ids:', error);
            Swal.fire(t('Error'), t('Failed to load saved cars.'), 'error');
        }
    }, [t]);

    const fetchCars = useCallback(async () => {
        try {
            const fetchedCars = await fetchCarsFromFirebase();
            setCars(fetchedCars);
        } catch (error) {
            console.error('Error fetching cars:', error);
            Swal.fire(t('Error'), t('Failed to load cars.'), 'error');
        }
    }, [t]);

    const removeSavedCar = useCallback(async (carId) => {
        if (!auth.currentUser) {
            Swal.fire(t('Please log in'), t('To remove cars, please log in.'), 'info');
            return;
        }
        try {
            const userDoc = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userDoc, {
                savedCars: arrayRemove(carId)
            });
            setSavedCarIds(prev => prev.filter(id => id !== carId));
            Swal.fire(t('Removed'), t('Car removed successfully!'), 'success');
        } catch (error) {
            console.error('Error removing car:', error);
            Swal.fire(t('Error'), t('Failed to remove car.'), 'error');
        }
    }, [t]);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                await Promise.all([fetchSavedCarIds(), fetchCars()]);
            } else {
                setSavedCarIds([]);
                setCars([]);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [fetchSavedCarIds, fetchCars]);

    const normalizedSavedCarIds = savedCarIds.map(id => String(id));
    const savedCars = cars.filter(car => normalizedSavedCarIds.includes(String(car.id)));

    const renderCarInfo = useCallback((car) => (
        <div className="car-info">
            <span><FaCar /> {car.year}</span>
            <span><MdElectricCar /> {t("{{seats}} seats", { seats: car.seats })}</span>
            {car.fuelType === 'Electric' ? (
                <span><FaChargingStation /> {car.battery}</span>
            ) : (
                <span><MdLocalGasStation /> {car.fuel}</span>
            )}
        </div>
    ), [t]);

    const renderPriceInfo = useCallback((car) => (
        <div className="price-info">
            <span>{t("{{price}} ₪/hour", { price: Math.floor(car.pricePerHour) })}</span>
            <span>{t("{{price}} ₪/day", { price: car.pricePerDay })}</span>
        </div>
    ), [t]);

    const handleCarClick = useCallback((carId) => {
        navigate(`/map?carId=${carId}`);
    }, [navigate]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!auth.currentUser) {
        return (
            <div className="saved-page">
                <div className="saved-info-container">
                    <div className="icon-container">
                        <MdNoAccounts className="icon pulse" />
                    </div>
                    <div className="text-container">
                        <h1 className="glow-text">{t("You're not connected")}</h1>
                        <p>{t("Connect with your account to access and manage your saved items seamlessly.")}</p>
                        <p>{t("Stay connected and never lose track of your preferences and saved content.")}</p>
                        <Link to="/profile" className="sign-in-link">
                            {t("Sign in now")}
                            <span className="shine"></span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (savedCars.length === 0) {
        return (
            <div className="saved-page">
                <div className="saved-info-container">
                    <div className="icon-container">
                        <MdOutlineSaveAlt className="icon bounce" />
                    </div>
                    <div className="text-container">
                        <h1 className="glow-text">{t("Nothing here yet")}</h1>
                        <p>{t("You haven't saved anything yet.")}</p>
                        <p>{t("Start adding some items and they will show up here!")}</p>
                        <Link to="/car-list" className="sign-in-link">
                            {t("Explore Cars")}
                            <span className="shine"></span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="saved-page">
            <div className="saved-header">
                <h1 className="glow-text">{t("your garage")}</h1>
                <div className="underline"></div>
            </div>
            <div className="saved-container">
                {savedCars.map((car) => (
                    <div 
                        key={car.id} 
                        className="saved-car-item"
                        onClick={() => handleCarClick(car.id)}
                    >
                        <div className="car-image-container">
                            <img src={car.image} alt={t("{{brand}} {{model}}", { brand: car.brand, model: car.model })} />
                            <button onClick={() => removeSavedCar(car.id)} className='remove-button'>
                                <MdBookmarkRemove />
                            </button>
                        </div>
                        <div className="saved-car-details">
                            <h2>{t("{{brand}} {{model}}", { brand: car.brand, model: car.model })}</h2>
                            {renderCarInfo(car)}
                            {renderPriceInfo(car)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Saved;
