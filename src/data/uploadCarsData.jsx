// import { collection, addDoc } from 'firebase/firestore';
// import { db } from './firebaseConfig';
// import cars from './carsData';

// export const uploadCarsToFirebase = async () => {
//   const carsCollection = collection(db, 'cars');

//   for (const car of cars) {
//     try {
//       await addDoc(carsCollection, car);
//       console.log(`Car ${car.id} uploaded successfully`);
//     } catch (error) {
//       console.error(`Error uploading car ${car.id}:`, error);
//     }
//   }

//   console.log('All cars uploaded to Firebase');
// };

// // Run this function once to upload all cars
// uploadCarsToFirebase();