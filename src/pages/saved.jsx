import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import LoadingPage from '../assets/LoadingPage';
import { auth, db } from '../data/firebaseConfig';
import { doc, getDoc, arrayRemove, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { MdBookmarkRemove, MdNoAccounts, MdOutlineSaveAlt, MdElectricCar, MdLocalGasStation } from "react-icons/md";
import { FaCar, FaChargingStation } from "react-icons/fa";
import '../styles/saved.css';
import { fetchCarsFromFirebase } from '../data/fetchCars';

const Saved = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
    const [savedCarIds, setSavedCarIds] = useState([]);
    const [cars, setCars] = useState([]);

    const fetchSavedCarIds = async () => {
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
        }
    };

    const fetchCars = async () => {
        try {
            const fetchedCars = await fetchCarsFromFirebase();
            setCars(fetchedCars);
        } catch (error) {
            console.error('Error fetching cars:', error);
            Swal.fire(t('Error'), t('Failed to load cars.'), 'error');
        }
    };

    const removeSavedCar = async (carId) => {
        if (!auth.currentUser) {
            Swal.fire(t('Please log in'), t('To remove cars, please log in.'), 'info');
            return;
        }
        try {
            const userDoc = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userDoc, {
                savedCars: arrayRemove(carId)
            });
            fetchSavedCarIds();
            Swal.fire(t('Removed'), t('Car removed successfully!'), 'success');
        } catch (error) {
            console.error('Error removing car:', error);
            Swal.fire(t('Error'), t('Failed to remove car.'), 'error');
        }
    };

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
    }, []);

    const normalizedSavedCarIds = savedCarIds.map(id => String(id));

    return (
        <div className="saved-page">
            {isLoading ? (
                <LoadingPage />
            ) : (
                <>
                    {!auth.currentUser ? (
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
                    ) : (
                        <>
                            {normalizedSavedCarIds.length === 0 ? (
                                <div className="saved-info-container">
                                    <div className="icon-container">
                                        <MdOutlineSaveAlt className="icon bounce" />
                                    </div>
                                    <div className="text-container">
                                        <h1 className="glow-text">{t("Nothing here yet")}</h1>
                                        <p>{t("You haven't saved anything yet.")}</p>
                                        <p>{t("Start adding some items and they will show up here!")}</p>
                                        <Link to="/" className="sign-in-link">
                                            {t("Explore Cars")}
                                            <span className="shine"></span>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="saved-header">
                                        <h1 className="glow-text">{t("your garage")}</h1>
                                        <div className="underline"></div>
                                    </div>
                                    <div className="saved-container">
                                        {cars
                                            .filter(car => normalizedSavedCarIds.includes(String(car.id)))
                                            .map((car) => (
                                                <div key={car.id} className="saved-car-item">
                                                    <div className="car-image-container">
                                                        <img src={car.image} alt={t("{{brand}} {{model}}", { brand: car.brand, model: car.model })} />
                                                        <button onClick={() => removeSavedCar(car.id)} className='remove-button'>
                                                            <MdBookmarkRemove />
                                                        </button>
                                                    </div>
                                                    <div className="saved-car-details">
                                                        <h2>{t("{{brand}} {{model}}", { brand: car.brand, model: car.model })}</h2>
                                                        <div className="car-info">
                                                            <span><FaCar /> {car.year}</span>
                                                            <span><MdElectricCar /> {t("{{seats}} seats", { seats: car.seats })}</span>
                                                            {car.fuelType === 'Electric' ? (
                                                                <span><FaChargingStation /> {car.battery}</span>
                                                            ) : (
                                                                <span><MdLocalGasStation /> {car.fuel}</span>
                                                            )}
                                                        </div>
                                                        <div className="price-info">
                                                            <span>{t("{{price}} ₪/hour", { price: Math.floor(car.pricePerHour) })}</span>
                                                            <span>{t("{{price}} ₪/day", { price: car.pricePerDay })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default withOfflineOverlay(Saved);