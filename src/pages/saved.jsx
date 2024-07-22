import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import withOfflineOverlay from '../assets/withOfflineOverlay';
import cars from '../data/carsData';
import LoadingPage from '../assets/LoadingPage';
import { auth, db } from '../data/firebaseConfig';
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { MdBookmarkRemove, MdNoAccounts, MdOutlineSaveAlt } from "react-icons/md"; 
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

    const normalizedSavedCarIds = savedCarIds.map(id => String(id));


    useEffect(() => {
        setIsLoading(true); 
        const unsubscribe = auth.onAuthStateChanged(user => { 
        if (user) {
            fetchSavedCarIds();
        } else {
            setSavedCarIds([]); 
            setIsLoading(false); 
        }
        });
    
        return () => unsubscribe(); 
    }, []);
  
    return (
        <>
        {isLoading ? ( 
            <LoadingPage /> 
        ) : (
            <>
            {!auth.currentUser ? (
                <div className="saved-info-container">
                    <div className="icon-container">
                        <MdNoAccounts className="icon" />
                    </div>
                    <div className="text-container">
                        <p>You're not connected</p>
                        <h2>Connect with your account to access and manage your saved items seamlessly.</h2>
                        <h2>Stay connected and never lose track of your preferences and saved content.</h2>
                        <Link to="/profile" className="sign-in-link">Sign in  now</Link>
                    </div>
                </div>
            ) : (
                <>
                {normalizedSavedCarIds.length === 0 ? (
                    // <div className="separate">
                    //     <h3>You haven't saved anything yet. Start adding some items and they will show up here!</h3> 
                    // </div>
                    <div className="saved-info-container">
                        <div className="icon-container">
                            <MdOutlineSaveAlt className="icon" />
                        </div>
                        <div className="text-container">
                            <p>Nothing here</p>
                            <h2>You haven't saved anything yet.</h2>
                            <h2> Start adding some items and they will show up here!</h2>
                            <Link to="/" className="sign-in-link">Go back</Link>
                        </div>
                    </div>
                


                ) : (
                    <>
                    <div className="separate">
                        <div className="separate-line"></div>
                        <h4>Your saved cars</h4> 
                        <div className="separate-line"></div>
                    </div>
                    <div className="saved-container">
                        {cars
                        .filter(car => normalizedSavedCarIds.includes(String(car.id)))
                        .map((car) => (
                        <div key={car.id} className="saved-car-item">
                            <button onClick={() => removeSavedCar(car.id)} className='saved-bt remove-bt'>
                                <MdBookmarkRemove />
                            </button>
                            <img src={car.image} alt={`${car.brand} ${car.model}`} />
                            <div className="saved-car-details">
                            <h3>{`${car.brand} ${car.model}`}</h3>
                            <p><span>{car.year}</span> • <span>{car.seats} seats</span></p>
                            <p><span>{Math.floor(car.pricePerHour)} ₪/hour</span></p>
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
        </>
    );
};

export default withOfflineOverlay(Saved);
