// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from '../../data/firebaseConfig';
// import '../../styles/profileDetails.css';
// import { MdModeEditOutline } from "react-icons/md";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// const ProfileDetails = ({ user, onEdit }) => {
//     const { displayName, email, phone, photoURL } = user || {};
//     const [profileImage, setProfileImage] = useState(null);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [address, setAddress] = useState('');
//     const [drivingLicense, setDrivingLicense] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('');

//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             try {
//                 const userDoc = doc(db, "userInfo", auth.currentUser.uid);
//                 const userSnapshot = await getDoc(userDoc);
//                 if (userSnapshot.exists()) {
//                     const userData = userSnapshot.data();
//                     setFirstName(userData.firstName || '');
//                     setLastName(userData.lastName || '');
//                     setPhoneNumber(userData.phoneNumber || '');
//                     setAddress(userData.address || '');
//                     setDrivingLicense(userData.drivingLicense || '');
//                     setPaymentMethod(userData.paymentMethod || '');
//                     setProfileImage(userData.photoURL || '');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user info: ', error);
//             }
//         };

//         fetchUserInfo();
//     }, []);


//     const handleImageUpload = (e) => {
//         const imageFile = e.target.files[0];
//         if (imageFile) {
//             const imageUrl = URL.createObjectURL(imageFile);
//             Swal.fire({
//                 title: 'Are you sure?',
//                 text: "Do you want to change your profile picture?",
//                 icon: 'question',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Yes, change it!'
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     setProfileImage(imageUrl);
//                     Swal.fire(
//                         'Changed!',
//                         'Your profile picture has been updated.',
//                         'success'
//                     );
//                 }
//             });
//         }
//     };

//     const handleSaveChanges = async () => {
//         try {
//             const userDoc = doc(db, "userInfo", auth.currentUser.uid);
//             const userSnapshot = await getDoc(userDoc);

//             if (userSnapshot.exists()) {
//                 await updateDoc(userDoc, {
//                     firstName,
//                     lastName,
//                     phoneNumber,
//                     address,
//                     drivingLicense,
//                     paymentMethod,
//                     photoURL: profileImage || photoURL,
//                 });
//             } else {
//                 await setDoc(userDoc, {
//                     firstName,
//                     lastName,
//                     phoneNumber,
//                     address,
//                     drivingLicense,
//                     paymentMethod,
//                     photoURL: profileImage || photoURL,
//                 });
//             }

//             Swal.fire('Success', 'Your information has been updated.', 'success');
//         } catch (error) {
//             console.error('Error updating document: ', error);
//             Swal.fire('Error', 'Failed to update your information.', 'error');
//         }
//     };

//     return (
//         <div className="profile-container">
//             <h2>User Profile</h2>
//             <div className="profile-item">
//                 <div className="profile-photo">
//                     {profileImage ? (
//                         <img src={profileImage} alt="Profile" />
//                     ) : (
//                         photoURL ? (
//                             <img src={photoURL} alt="Profile" />
//                         ) : (
//                             <FontAwesomeIcon icon={faUser} size="6x" />
//                         )
//                     )}
//                     <button id="editProfileButton" className="profile-edit-button" onClick={() => document.getElementById('fileInput').click()}>
//                         <MdModeEditOutline />
//                     </button>
//                 </div>
//                 <input id="fileInput" type="file" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
//                 <p className="profile-label">{displayName || email}</p>
//             </div>
//             <hr className="profile-divider" />
//             <div className="profile-item">
//                 <p className="profile-label">Email: {email}</p>
//             </div>
//             <hr className="profile-divider" />
//             <div className="profile-item">
//                 <p className="profile-label">Phone Number: {phone}</p>
//             </div>
//             <hr className="profile-divider" />

//             <div className="profile-edit-section">
//                 <h3>Edit Your Personal Info</h3>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="firstName"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         placeholder=" "
//                     />
//                     <label htmlFor="firstName">First Name</label>
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="lastName"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         placeholder=" "
//                     />
//                     <label htmlFor="lastName">Last Name</label>
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="phoneNumber"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder=" "
//                     />
//                     <label htmlFor="phoneNumber">Phone Number</label>
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         placeholder=" "
//                     />
//                     <label htmlFor="address">Address</label>
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="drivingLicense"
//                         value={drivingLicense}
//                         onChange={(e) => setDrivingLicense(e.target.value)}
//                         placeholder=" "
//                     />
//                     <label htmlFor="drivingLicense">Driving License</label>
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         id="paymentMethod"
//                         value={paymentMethod}
//                         onChange={(e) => setPaymentMethod(e.target.value)}
//                         placeholder=" "
//                     />
//                     <label htmlFor="paymentMethod">Payment Method</label>
//                 </div>
//                 <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
//             </div>
//         </div>
//     );
// };

// export default ProfileDetails;







import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../data/firebaseConfig';
import '../../styles/profileDetails.css';
import { MdModeEditOutline } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

const ProfileDetails = ({ user }) => {
    const { t } = useTranslation();
    const { displayName, email, phone, photoURL } = user || {};
    const [profileImage, setProfileImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [drivingLicense, setDrivingLicense] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const userDoc = doc(db, "userInfo", auth.currentUser.uid);
    //             const userSnapshot = await getDoc(userDoc);
    //             if (userSnapshot.exists()) {
    //                 const userData = userSnapshot.data();
    //                 setFirstName(userData.firstName || '');
    //                 setLastName(userData.lastName || '');
    //                 setPhoneNumber(userData.phoneNumber || '');
    //                 setAddress(userData.address || '');
    //                 setDrivingLicense(userData.drivingLicense || '');
    //                 setPaymentMethod(userData.paymentMethod || '');
    //                 setProfileImage(userData.photoURL || '');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user info: ', error);
    //         }
    //     };

    //     fetchUserInfo();
    // }, []);

    
    // const handleSaveChanges = async () => {
    //     try {
    //         const userDoc = doc(db, "userInfo", auth.currentUser.uid);
    //         const userSnapshot = await getDoc(userDoc);
            
    //         const userData = {
    //             firstName,
    //             lastName,
    //             phoneNumber,
    //             address,
    //             drivingLicense,
    //             paymentMethod,
    //             photoURL: profileImage || photoURL,
    //         };
            
    //         if (userSnapshot.exists()) {
    //             await updateDoc(userDoc, userData);
    //         } else {
    //             await setDoc(userDoc, userData);
    //         }

    //         Swal.fire(t('success'), t('information updated'), 'success');
    //     } catch (error) {
    //         console.error('Error updating document: ', error);
    //         Swal.fire(t('error'), t('failed to update information'), 'error');
    //     }
    // };


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    setFirstName(userData.firstName || '');
                    setLastName(userData.lastName || '');
                    setPhoneNumber(userData.phoneNumber || '');
                    setAddress(userData.address || '');
                    setDrivingLicense(userData.drivingLicense || '');
                    setPaymentMethod(userData.paymentMethod || '');
                    setProfileImage(userData.photoURL || '');
                }
            } catch (error) {
                console.error('Error fetching user info: ', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSaveChanges = async () => {
        try {
            const userDoc = doc(db, "users", auth.currentUser.uid);
            const userSnapshot = await getDoc(userDoc);

            const userData = {
                firstName,
                lastName,
                phoneNumber,
                address,
                drivingLicense,
                paymentMethod,
                photoURL: profileImage || photoURL,
            };

            if (userSnapshot.exists()) {
                await updateDoc(userDoc, userData);
            } else {
                await setDoc(userDoc, userData);
            }

            Swal.fire(t('success'), t('information updated'), 'success');
        } catch (error) {
            console.error('Error updating document: ', error);
            Swal.fire(t('error'), t('failed to update information'), 'error');
        }
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
                    setProfileImage(imageUrl);
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
                    {profileImage ? (
                        <img src={profileImage} alt={t('profile')} />
                    ) : (
                        photoURL ? (
                            <img src={photoURL} alt={t('profile')} />
                        ) : (
                            <FontAwesomeIcon icon={faUser} size="6x" />
                        )
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
                <p className="profile-label">{displayName || email}</p>
                <p className="profile-label"> {email}</p>
            </div>

            <motion.div 
                className="profile-edit-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <h3>{t('edit your personal info')}</h3>
                <div className="input-container">
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=" "
                    />
                    <label htmlFor="firstName">{t('first name')}</label>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=" "
                    />
                    <label htmlFor="lastName">{t('last name')}</label>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder=" "
                    />
                    <label htmlFor="phoneNumber">{t('phone number')}</label>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=" "
                    />
                    <label htmlFor="address">{t('address')}</label>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="drivingLicense"
                        value={drivingLicense}
                        onChange={(e) => setDrivingLicense(e.target.value)}
                        placeholder=" "
                    />
                    <label htmlFor="drivingLicense">{t('driving license')}</label>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        placeholder=" "
                    />
                    <label htmlFor="paymentMethod">{t('payment method')}</label>
                </div>
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