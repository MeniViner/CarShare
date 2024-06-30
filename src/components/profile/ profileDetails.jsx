import React from 'react';
import '../../styles/profileDetails.css';

const ProfileDetails = ({ user }) => { // הוספתי את הפרופס user
    const { displayName, email, phone, sendReceipt } = user || {}; // קיבלתי את כל הנתונים מהמשתמש

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-item">
                <p className="profile-label">User Name: {displayName || email}</p> {/* השתמשתי ב- displayName אם קיים, אחרת ב-email */}
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
            <div className="profile-item">
                <p className="profile-label">Send Receipt to Email: {sendReceipt ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default ProfileDetails;
