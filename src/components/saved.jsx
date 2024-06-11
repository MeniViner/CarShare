import React, { useState, useEffect } from 'react';
import cars from '../data/carsData';
import LoadingPage from '../assets/LoadingPage';
import { auth, db } from '../data/firebaseConfig';
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { MdBookmarkRemove } from "react-icons/md"; 
import '../styles/saved.css'

const Saved = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [savedCarIds, setSavedCarIds] = useState([]); 

    const fetchSavedCarIds = async () => {
        if (!auth.currentUser) {
          return;
        }
        try {
          const q = query(collection(db, 'savedCars'), where('userId', '==', auth.currentUser.uid)); 
          const querySnapshot = await getDocs(q); 
          const ids = querySnapshot.docs.map(doc => doc.data().carId); 
          setSavedCarIds(ids); 
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching saved car ids:', error);
        }
    };


    // פונקציה להסרת רכב שמור
    const removeSavedCar = async (carId) => {
        if (!auth.currentUser) {
            Swal.fire('Please log in', 'To remove cars, please log in.', 'info'); 
            return;
        }
        try {
            const q = query(collection(db, 'savedCars'), where('userId', '==', auth.currentUser.uid), where('carId', '==', carId)); 
            const querySnapshot = await getDocs(q); 
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);  
            });
            fetchSavedCarIds(); // רענן את הרשימה לאחר הסרת הרכב
            Swal.fire('Removed', 'Car removed successfully!', 'success'); 
        } catch (error) {
            console.error('Error removing car:', error);
            Swal.fire('Error', 'Failed to remove car.', 'error'); 
        }
    };
  

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { 
          if (user) {
            fetchSavedCarIds();
          } else {
            setSavedCarIds([]); 
          }
        });

        return () => unsubscribe(); 
    }, []);

    const normalizedSavedCarIds = savedCarIds.map(id => String(id));

    return (
    <div>

        {/* הודעה למשתמשים לא מחוברים */}
        {!auth.currentUser && (
            <div className="separate">
                <h2>To see your saved items, Connect with your account.</h2> 
            </div>
        )}

        {(isLoading && auth.currentUser) ? (
            <LoadingPage />
        ) : (
            <>
                {(normalizedSavedCarIds.length === 0 && auth.currentUser ) ? (
                    <div className="separate">
                        <h3>You haven't saved anything yet. Start adding some items and they will show up here!</h3> 
                    </div>
                ) : (
                    <>
                        {auth.currentUser && (
                        <div className="separate">
                            <div className="separate-line"></div>
                                <h4>your saved cars.</h4> 
                            <div className="separate-line"></div>
                        </div>
                        )}

                        {/* הצגת רכבים שמורים למשתמש המחובר */}
                        <div className="saved-container">
                            {cars
                            .filter(car => normalizedSavedCarIds.includes(String(car.id)))
                            .map((car) => (
                                <div key={car.id} className="saved-car-item">
                                    <img src={car.image} alt={`${car.brand} ${car.model}`} />
                                    <div className="saved-car-details">
                                        <h3>{`${car.brand} ${car.model}`}</h3>
                                        <p><span>{car.year}</span> • <span>{car.seats} seats</span></p>
                                        <p><span>{Math.floor(car.pricePerHour)} ₪/hour</span></p>
                                    </div>
                                    <button onClick={() => removeSavedCar(car.id)} className='saved-bt'>
                                        <MdBookmarkRemove />
                                    </button>
                                </div>
                            ))}    
                        </div>
                    </>
                )}
            </>
        )}
    </div>
    );
};

export default Saved;
