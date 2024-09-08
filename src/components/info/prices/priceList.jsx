import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fetchCarsFromFirebase } from '../../../data/fetchCars';
import LoadingPage from '../../../assets/LoadingPage';
import '../../../styles/priceList.css';

const PriceList = () => {
  const { t } = useTranslation();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    try {
      const fetchedCars = await fetchCarsFromFirebase();
      setCars(fetchedCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="price-list-container">
      <motion.h1 
        className="price-list-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('price list')}
      </motion.h1>
      <motion.p 
        className="update-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {t('price list updated')}: {new Date().toLocaleDateString()}
      </motion.p>
      
      <div className="car-options-grid">
        {cars.map((car, index) => (
          <motion.div 
            key={car.id} 
            className="car-option"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <h2> {t('{{seats}} seats', { seats: car.seats })} | {car.brand} {car.model} | {t(car.category)}</h2>
            <img src={car.image5} alt={`${car.brand} ${car.model}`} />
            <div className="price-details">
              <motion.div 
                className="price-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="price-label">{t('hourly')}</span>
                <span className="price-value">{car.pricePerHour} ₪ {t('per hour')}</span>
              </motion.div>
              <motion.div 
                className="price-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="price-label">{t('daily')}</span>
                <span className="price-value">{car.pricePerDay} ₪ {t('per day')}</span>
              </motion.div>
              <motion.div 
                className="price-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="price-label">{t('unlock fee')}</span>
                <span className="price-value">{car.unlockFee} ₪</span>
              </motion.div>
              <motion.div 
                className="price-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="price-label">{t('Price p-km')}</span>
                <span className="price-value">{car.kmPrice} ₪</span>
              </motion.div>
            </div>
            <p className="car-description">{car.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PriceList;