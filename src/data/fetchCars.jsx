import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const fetchCarsFromFirebase = async () => {
  const carsCollection = collection(db, 'cars');
  const carSnapshot = await getDocs(carsCollection);
  const carList = carSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return carList;
};