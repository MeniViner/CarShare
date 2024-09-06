import React, { useState, useEffect } from 'react';
import { t } from 'i18next';
import { auth, db } from '../../data/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';


const EditProfile = () => {
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

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const userDoc = doc(db, "userInfo", auth.currentUser.uid);
    //             const userSnapshot = await getDoc(userDoc);
    //             if (userSnapshot.exists()) {
    //                 setUserInfo(userSnapshot.data());
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

    //         if (userSnapshot.exists()) {
    //             await updateDoc(userDoc, {
    //                 ...userInfo,
    //                 photoURL: profileImage || userSnapshot.data().photoURL,
    //             });
    //         } else {
    //             await setDoc(userDoc, {
    //                 ...userInfo,
    //                 photoURL: profileImage || '',
    //             });
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
                    setUserInfo(userData);
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
                ...userInfo,
                photoURL: profileImage || userInfo.photoURL,
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setProfileImage(imageUrl);
        }
    };


    
    return (
        <div className="edit-profile-container">
            <h2>{t('edit your personal info')}</h2>
            <div className="edit-profile-photo">
                {profileImage ? (
                    <img src={profileImage} alt={t('profile')} />
                ) : (
                    <label className="upload-label">
                        <input type="file" onChange={handleImageUpload} accept="image/*" />
                        <span>{t('upload profile image')}</span>
                    </label>
                )}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('first name')}</label>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('last name')}</label>
            </div>
            <div className="input-container">
                <input
                    type="date" 
                    name="birthDate"
                    value={userInfo.birthDate}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('date of birth')}</label>
            </div>
            <div className="input-container">
                <input
                    type="tel"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('phone number')}</label>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('address')}</label>
            </div>
            <div className="input-container">
                <input
                    type="number"
                    name="drivingLicense"
                    value={userInfo.drivingLicense}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('driving license')}</label>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="paymentMethod"
                    value={userInfo.paymentMethod}
                    onChange={handleInputChange}
                    required
                />
                <label>{t('payment method')}</label>
            </div>
            <button onClick={handleSaveChanges} className="save-button">{t('save changes')}</button>
        </div>
    );
};

export default EditProfile;
