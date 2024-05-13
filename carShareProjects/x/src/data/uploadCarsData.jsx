import { getFirestore, collection, addDoc } from 'firebase/firestore';
import cars from './carsData';
import { db } from './firebaseConfig';

const uploadCarsData = async () => {
  try {
    const carsCollection = collection(db, 'cars');
    for (const car of cars) {
      await addDoc(carsCollection, car);
    }
    console.log('Cars data added successfully!');
  } catch (error) {
    console.error('Error adding cars data: ', error);
  }
};

uploadCarsData();