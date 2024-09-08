// import React, { useState, useEffect } from 'react';
// import { t } from 'i18next';
// import { auth, db } from '../../data/firebaseConfig';
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import Swal from 'sweetalert2';


// const EditProfile = () => {
//     const [userInfo, setUserInfo] = useState({
//         firstName: '',
//         lastName: '',
//         birthDate: '',
//         phoneNumber: '',
//         address: '',
//         drivingLicense: '',
//         paymentMethod: '',
//     });
//     const [profileImage, setProfileImage] = useState(null);


//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             try {
//                 const userDoc = doc(db, "users", auth.currentUser.uid);
//                 const userSnapshot = await getDoc(userDoc);
//                 if (userSnapshot.exists()) {
//                     const userData = userSnapshot.data();
//                     setUserInfo(userData);
//                     setProfileImage(userData.photoURL || '');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user info: ', error);
//             }
//         };

//         fetchUserInfo();
//     }, []);

//     const handleSaveChanges = async () => {
//         try {
//             const userDoc = doc(db, "users", auth.currentUser.uid);
//             const userSnapshot = await getDoc(userDoc);

//             const userData = {
//                 ...userInfo,
//                 photoURL: profileImage || userInfo.photoURL,
//             };

//             if (userSnapshot.exists()) {
//                 await updateDoc(userDoc, userData);
//             } else {
//                 await setDoc(userDoc, userData);
//             }

//             Swal.fire(t('success'), t('information updated'), 'success');
//         } catch (error) {
//             console.error('Error updating document: ', error);
//             Swal.fire(t('error'), t('failed to update information'), 'error');
//         }
//     };


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserInfo({ ...userInfo, [name]: value });
//     };

//     const handleImageUpload = (e) => {
//         const imageFile = e.target.files[0];
//         if (imageFile) {
//             const imageUrl = URL.createObjectURL(imageFile);
//             setProfileImage(imageUrl);
//         }
//     };


    
//     return (
//         <div className="edit-profile-container">
//             <h2>{t('edit your personal info')}</h2>
//             <div className="edit-profile-photo">
//                 {profileImage ? (
//                     <img src={profileImage} alt={t('profile')} />
//                 ) : (
//                     <label className="upload-label">
//                         <input type="file" onChange={handleImageUpload} accept="image/*" />
//                         <span>{t('upload profile image')}</span>
//                     </label>
//                 )}
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     name="firstName"
//                     value={userInfo.firstName}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('first name')}</label>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     name="lastName"
//                     value={userInfo.lastName}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('last name')}</label>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="date" 
//                     name="birthDate"
//                     value={userInfo.birthDate}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('date of birth')}</label>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={userInfo.phoneNumber}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('phone number')}</label>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     name="address"
//                     value={userInfo.address}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('address')}</label>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="number"
//                     name="drivingLicense"
//                     value={userInfo.drivingLicense}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('driving license')}</label>
//             </div>
//             <div className="input-container">
//                 <input
//                     type="text"
//                     name="paymentMethod"
//                     value={userInfo.paymentMethod}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <label>{t('payment method')}</label>
//             </div>
//             <button onClick={handleSaveChanges} className="save-button">{t('save changes')}</button>
//         </div>
//     );
// };

// export default EditProfile;













import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../../data/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const USER_CACHE_KEY = 'cachedUserInfo';

const EditProfile = () => {
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
        address: '',
        drivingLicense: '',
        paymentMethod: '',
    });
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Check local cache first
                const cachedUserInfo = localStorage.getItem(USER_CACHE_KEY);
                if (cachedUserInfo) {
                    const parsedUserInfo = JSON.parse(cachedUserInfo);
                    setUserInfo(parsedUserInfo);
                    setProfileImage(parsedUserInfo.photoURL || '');
                    return;
                }

                // If not in cache, fetch from Firestore
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setUserInfo(userData);
                    setProfileImage(userData.photoURL || '');
                    // Cache the user data
                    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData));
                }
            } catch (error) {
                console.error('Error fetching user info: ', error);
                Swal.fire(t('error'), t('failed to fetch user information'), 'error');
            }
        };

        fetchUserInfo();
    }, [t]);

    const handleSaveChanges = async () => {
        try {
            const userDoc = doc(db, "users", auth.currentUser.uid);
            const userData = {
                ...userInfo,
                photoURL: profileImage || userInfo.photoURL,
            };

            await setDoc(userDoc, userData, { merge: true });

            // Update local cache
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(userData));

            Swal.fire(t('success'), t('information updated'), 'success');
        } catch (error) {
            console.error('Error updating document: ', error);
            Swal.fire(t('error'), t('failed to update information'), 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevInfo => {
            const newInfo = { ...prevInfo, [name]: value };
            // Update local cache on each change
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(newInfo));
            return newInfo;
        });
    };

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setProfileImage(imageUrl);
            // Update local cache with new image URL
            const updatedUserInfo = { ...userInfo, photoURL: imageUrl };
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(updatedUserInfo));
        }
    };

    return (
        <div className="edit-profile">
            <h2>{t('Edit Profile')}</h2>
            <div className="profile-image">
                <img src={profileImage || '/placeholder.svg?height=100&width=100'} alt={t('Profile')} />
                <input type="file" onChange={handleImageUpload} accept="image/*" />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                <div>
                    <label htmlFor="firstName">{t('First Name')}</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">{t('Last Name')}</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="birthDate">{t('Birth Date')}</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={userInfo.birthDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">{t('Phone Number')}</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="address">{t('Address')}</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="drivingLicense">{t('Driving License')}</label>
                    <input
                        type="text"
                        id="drivingLicense"
                        name="drivingLicense"
                        value={userInfo.drivingLicense}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="paymentMethod">{t('Payment Method')}</label>
                    <input
                        type="text"
                        id="paymentMethod"
                        name="paymentMethod"
                        value={userInfo.paymentMethod}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">{t('Save Changes')}</button>
            </form>
        </div>
    );
};

export default EditProfile;


// הוספנו שימוש במטמון מקומי (`localStorage`) לשמירה וקריאה של מידע המשתמש.
// עדכנו את `fetchUserInfo` כך שתבדוק קודם את המטמון המקומי לפני פנייה ל-Firestore.
// עדכנו את `handleSaveChanges` כך שיעדכן גם את המטמון המקומי.
// הוספנו עדכון של המטמון המקומי בכל שינוי של שדה בטופס.
// שיפרנו את השימוש ב-i18next על ידי שימוש ב-`useTranslation` והחלפת כל המחרוזות הקבועות ב-`t()`.