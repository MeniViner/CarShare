import React, { useState } from 'react';
import '../../styles/profileDetails.css';

const ProfileDetails = ({ user, onEdit }) => {
    const { displayName, email, phone } = user || {}; // קיבלתי את כל הנתונים מהמשתמש
    const [sendReceipt, setSendReceipt] = useState(user.sendReceipt || false);

    const handleToggleSendReceipt = () => {
        setSendReceipt(prevSendReceipt => !prevSendReceipt);
        // ניתן להוסיף כאן לוגיקה נוספת לשמירת העדכון בשרת או ב-LocalStorage
    };

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
                <p className="profile-label">Send Receipt to Email:</p>
                <button className={`toggle-button ${sendReceipt ? 'active' : ''}`} onClick={handleToggleSendReceipt}>
                    <div className="toggle-track">
                        <div className="toggle-thumb"></div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProfileDetails;
