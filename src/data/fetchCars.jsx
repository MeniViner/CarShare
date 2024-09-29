import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const CACHE_KEY = 'cachedCars';

export const fetchCarsFromFirebase = async (forceRefresh = false) => {
  // Check if we have cached data and it's not a forced refresh
  if (!forceRefresh) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      console.log('Returning cached car data');
      return JSON.parse(cachedData);
    }
  }

  // If no cache or forced refresh, fetch from Firebase
  try {
    console.log('Fetching cars from Firebase');
    const carsCollection = collection(db, 'cars');
    const carSnapshot = await getDocs(carsCollection);
    const carList = carSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Cache the fetched data without expiration
    localStorage.setItem(CACHE_KEY, JSON.stringify(carList));

    return carList;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

// Function to clear the cache (uses when updating car data)
export const clearCarCache = () => {
  localStorage.removeItem(CACHE_KEY);
};