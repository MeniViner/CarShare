import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import LoadingPage from '../assets/LoadingPage';s


const FetchCarsData = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        setLoading(true);
        const carsSnapshot = await getDocs(collection(db, 'cars'));
        const carsData = carsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCars(carsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return cars;
};

export default FetchCarsData;