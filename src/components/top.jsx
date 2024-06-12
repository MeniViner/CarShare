import React, { useState, useEffect } from "react";
import { auth } from "../data/firebaseConfig"; // ייבא את auth מ-firebase
import { onAuthStateChanged } from "firebase/auth"; // ייבא את onAuthStateChanged

const Top = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // מאזין לשינויים במצב המשתמש
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email); // הגדר את שם המשתמש או הדוא"ל
      } else {
        setUserName(""); // אם אין משתמש מחובר
      }
    });

    return () => unsubscribe(); // נקה את המאזין כשהקומפוננטה מוסרת
  }, []);

  return (
    <>
      <div className="top-section">
        <span>
          {userName ? `welcome back, ${userName}.` : "welcome back user"} {/* הצג את שם המשתמש אם מחובר */}
        </span>
      </div>
    </>
  );
};

export default Top;
