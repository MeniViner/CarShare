import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { auth, db } from '../../data/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';
import LoadingPage from '../../assets/LoadingPage'
import { MdModeEditOutline } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import '../../styles/profileDetails.css';


const USER_CACHE_KEY = 'cachedUserInfo';

const ProfileDetails = ({ user }) => {
    const { t } = useTranslation();
    const storage = getStorage();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        drivingLicense: '',
        paymentMethod: '',
        photoURL: ''
    });
    
    const fetchUserInfo = useCallback(async () => {
        setIsLoading(true);

        if (!auth.currentUser) {
            return;
        }

        try {
            const userDoc = doc(db, "users", auth.currentUser.uid);
            const userSnapshot = await getDoc(userDoc);
            
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                setProfileData(prevData => ({
                    ...prevData,
                    ...userData
                }));
                localStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData));
            } else {
                console.log('No user data found in Firestore');
                const cachedUser = localStorage.getItem(USER_CACHE_KEY);
                if (cachedUser) {
                    setProfileData(JSON.parse(cachedUser));
                }
            }
        } catch (error) {
            console.error('Error fetching user info: ', error);
            Swal.fire(t('error'), t('failed to fetch user information'), 'error');
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    useEffect(() => {
        setIsLoading(true);
        const initializeAuth = async () => {
            await setPersistence(auth, browserLocalPersistence);
            
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsAuthenticated(true);
                    fetchUserInfo();
                } else {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                }
            });
        };
      
        initializeAuth();
    }, [fetchUserInfo]);


    if (isLoading) {
        return <LoadingPage />;
    }

    const handleSaveChanges = async () => {
        try {
            if (!auth.currentUser) {
                Swal.fire({
                    title: t('error'),
                    text: t('user not authenticated'),
                    icon: 'error',
                    confirmButtonText: t('connect now'), 
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/profile'); 
                    }
                  });
                return;
            }

            const userDoc = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDoc, profileData, { merge: true });
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(profileData));
            Swal.fire(t('success'), t('information updated'), 'success');
        } catch (error) {
            console.error('Error updating document: ', error);
            Swal.fire(t('error'), t('failed to update information'), 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            try {
                const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}/${imageFile.name}`);
                
                // Upload image to Firebase Storage
                await uploadBytes(storageRef, imageFile);
                const imageUrl = await getDownloadURL(storageRef);

                // Show confirmation before saving image
                const result = await Swal.fire({
                    title: t('change profile picture'),
                    text: t('change profile picture confirmation'),
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: t('yes change it'),
                    cancelButtonText: t('no dont')
                });

                if (result.isConfirmed) {
                    // Update profileData with the new image URL
                    setProfileData(prevData => ({
                        ...prevData,
                        photoURL: imageUrl
                    }));
                    
                    // Update the user document in Firestore
                    const userDoc = doc(db, "users", auth.currentUser.uid);
                    await setDoc(userDoc, { photoURL: imageUrl }, { merge: true });
                    
                    Swal.fire(t('changed'), t('profile picture updated'), 'success');
                }
            } catch (error) {
                console.error("Error uploading image: ", error);
                Swal.fire(t('error'), t('failed to upload image'), 'error');
            }
        }
    };

    return (
        <motion.div 
            className="profile-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>{t('user profile')}</h2>
            <div className="profile-item">
                <div className="profile-photo">
                    {profileData.photoURL ? (
                        <img src={profileData.photoURL} alt={t('profile')} />
                    ) : (
                        <FontAwesomeIcon icon={faUser} size="6x" />
                    )}
                    <motion.button 
                        id="editProfileButton" 
                        className="profile-edit-button" 
                        onClick={() => document.getElementById('fileInput').click()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MdModeEditOutline />
                    </motion.button>
                </div>
                <input id="fileInput" type="file" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                <p className="profile-label">{user?.displayName || user?.email}</p>
                <p className="profile-label">{user?.email}</p>
            </div>

            <motion.div 
                className="profile-edit-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h3>{t('edit your personal info')}</h3>
                {['firstName', 'lastName', 'phoneNumber', 'address', 'drivingLicense', 'paymentMethod'].map((field) => (
                    <div className="input-container" key={field}>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={profileData[field] || ''}
                            onChange={handleInputChange}
                            placeholder=" "
                        />
                        <label htmlFor={field}>{t(field)}</label>
                    </div>
                ))}
                <motion.button 
                    onClick={handleSaveChanges} 
                    className="save-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {t('save changes')}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default ProfileDetails;

