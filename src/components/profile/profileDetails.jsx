import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../data/firebaseConfig';
import '../../styles/profileDetails.css';
import { MdModeEditOutline } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileDetails = ({ user, onEdit }) => {
    const { displayName, email, phone, photoURL } = user || {};
    const [profileImage, setProfileImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [drivingLicense, setDrivingLicense] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userDoc = doc(db, "userInfo", auth.currentUser.uid);
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


    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to change your profile picture?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setProfileImage(imageUrl);
                    Swal.fire(
                        'Changed!',
                        'Your profile picture has been updated.',
                        'success'
                    );
                }
            });
        }
    };

    const handleSaveChanges = async () => {
        try {
            const userDoc = doc(db, "userInfo", auth.currentUser.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                await updateDoc(userDoc, {
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    drivingLicense,
                    paymentMethod,
                    photoURL: profileImage || photoURL,
                });
            } else {
                await setDoc(userDoc, {
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    drivingLicense,
                    paymentMethod,
                    photoURL: profileImage || photoURL,
                });
            }

            Swal.fire('Success', 'Your information has been updated.', 'success');
        } catch (error) {
            console.error('Error updating document: ', error);
            Swal.fire('Error', 'Failed to update your information.', 'error');
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-item">
                <div className="profile-photo">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" />
                    ) : (
                        photoURL ? (
                            <img src={photoURL} alt="Profile" />
                        ) : (
                            <FontAwesomeIcon icon={faUser} size="6x" />
                        )
                    )}
                    <button id="editProfileButton" className="profile-edit-button" onClick={() => document.getElementById('fileInput').click()}>
                        <MdModeEditOutline />
                    </button>
                </div>
                <input id="fileInput" type="file" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                <p className="profile-label">{displayName || email}</p>
            </div>
            <hr className="profile-divider" />
            <div className="profile-item">
                <p className="profile-label">Email: {email}</p>
            </div>
            <hr className="profile-divider" />
            <div className="profile-item">
                <p className="profile-label">Phone Number: {phone}</p>
            </div>
            <hr className="profile-divider" />

            <div className="profile-edit-section">
                <h3>Edit Your Personal Info</h3>
                <div className="input-container">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="drivingLicense">Driving License</label>
                    <input
                        type="text"
                        id="drivingLicense"
                        value={drivingLicense}
                        onChange={(e) => setDrivingLicense(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <input
                        type="text"
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </div>
                <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
            </div>
        </div>
    );
};

export default ProfileDetails;
