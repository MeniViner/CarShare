import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from '../../data/firebaseConfig';
import '../../styles/profileDetails.css';
import { MdModeEditOutline } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const USER_CACHE_KEY = 'cachedUserInfo';

const ProfileDetails = ({ user }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
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
        try {
            if (!auth.currentUser) {
                console.error('No authenticated user');
                return;
            }

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
        }
    }, [t]);

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    const handleSaveChanges = async () => {
        try {
            if (!auth.currentUser) {
                // Swal.fire(t('error'), t('user not authenticated'), 'error');
                Swal.fire({
                    title: t('error'),
                    text: t('user not authenticated'),
                    icon: 'error',
                    confirmButtonText: t('connect now'),  // Customize the button text
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/profile');  // Redirect on button click
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

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            Swal.fire({
                title: t('change profile picture'),
                text: t('change profile picture confirmation'),
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t('yes change it'),
                cancelButtonText: t('cancel')
            }).then((result) => {
                if (result.isConfirmed) {
                    setProfileData(prevData => ({
                        ...prevData,
                        photoURL: imageUrl
                    }));
                    Swal.fire(
                        t('changed'),
                        t('profile picture updated'),
                        'success'
                    );
                }
            });
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



// **שימוש במטמון מקומי**: הוספנו שימוש ב-`localStorage` עם מפתח `USER_CACHE_KEY` לשמירה וקריאה של מידע המשתמש.
// **אחדות מצב**: במקום מספר משתני מצב נפרדים, השתמשנו באובייקט `profileData` אחד לכל נתוני הפרופיל.
// **יעילות בטעינת נתונים**: השתמשנו ב-`useCallback` עבור `fetchUserInfo` כדי למנוע יצירה מחדש של הפונקציה בכל רינדור.
// **עדכון מטמון בשמירת שינויים**: בעת שמירת שינויים, אנו מעדכנים גם את המטמון המקומי.
// **טיפול בשגיאות משופר**: הוספנו הודעות שגיאה עם תרגום ב-`fetchUserInfo`.
// **שיפור בטיפול בקלט**: השתמשנו בפונקציה `handleInputChange` אחת עבור כל השדות.
// **קוד נקי יותר**: השתמשנו ב-`map` כדי לרנדר את שדות הקלט, מה שהופך את הקוד לקריא יותר ופחות חזרתי.
// **שימוש עקבי ב-Firestore**: השתמשנו ב-`setDoc` עם האופציה `merge: true` במקום `updateDoc`, מה שמאפשר יצירת מסמך חדש אם הוא לא קיים.


// **שיפור בפונקציית `fetchUserInfo`**:

// - בדיקה אם המשתמש מחובר לפני ניסיון לגשת ל-Firestore.
// - אם אין נתונים ב-Firestore, מנסה לטעון מהמטמון המקומי.
// - עדכון ה-`profileData` באופן שמשמר את הנתונים הקיימים.

// **שיפור בפונקציית `handleSaveChanges`**:

// - בדיקה אם המשתמש מחובר לפני ניסיון לשמור נתונים.

// **טיפול בערכים חסרים**:

// - בשדות הקלט, הוספנו `|| ''` כדי להתמודד עם ערכים `undefined` או `null`.

// **שימור נתונים קיימים**:

// - בעת עדכון ה-`profileData`, אנו משתמשים ב-`prevData` כדי לשמר נתונים קיימים שלא השתנו.

// **שיפור בטיפול בשגיאות**:

// - הוספנו יותר הודעות שגיאה ולוגים כדי לסייע באיתור בעיות.

// **שמירה על אופטימיזציות קודמות**:

// - שמרנו על השימוש ב-`useCallback`, `localStorage`, ועל המבנה הכללי של הקומפוננטה.