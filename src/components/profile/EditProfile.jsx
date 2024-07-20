import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../data/firebaseConfig';

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

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userDoc = doc(db, "userInfo", auth.currentUser.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    setUserInfo(userSnapshot.data());
                }
            } catch (error) {
                console.error('Error fetching user info: ', error);
            }
        };

        fetchUserInfo();
    }, []);

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

    const handleSaveChanges = async () => {
        try {
            const userDoc = doc(db, "userInfo", auth.currentUser.uid);
            const userSnapshot = await getDoc(userDoc);

            if (userSnapshot.exists()) {
                await updateDoc(userDoc, {
                    ...userInfo,
                    photoURL: profileImage || userSnapshot.data().photoURL,
                });
            } else {
                await setDoc(userDoc, {
                    ...userInfo,
                    photoURL: profileImage || '',
                });
            }

            Swal.fire('Success', 'Your information has been updated.', 'success');
        } catch (error) {
            console.error('Error updating document: ', error);
            Swal.fire('Error', 'Failed to update your information.', 'error');
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Your Personal Info</h2>
            <div className="edit-profile-photo">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" />
                ) : (
                    <label className="upload-label">
                        <input type="file" onChange={handleImageUpload} accept="image/*" />
                        <span>Upload Profile Image</span>
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
                <label>First Name</label>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    required
                />
                <label>Last Name</label>
            </div>
            <div className="input-container">
                <input
                    type="date" 
                    name="birthDate"
                    value={userInfo.birth}
                    onChange={handleInputChange}
                    required
                />
                <label>data of birth</label>
            </div>
            <div className="input-container">
                <input
                    type="tel"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleInputChange}
                    required
                />
                <label>Phone Number</label>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    required
                />
                <label>Address</label>
            </div>
            <div className="input-container">
                <input
                    type="number"
                    name="drivingLicense"
                    value={userInfo.drivingLicense}
                    onChange={handleInputChange}
                    required
                />
                <label>Driving License</label>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    name="paymentMethod"
                    value={userInfo.paymentMethod}
                    onChange={handleInputChange}
                    required
                />
                <label>Payment Method</label>
            </div>
            <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
        </div>
    );
};

export default EditProfile;