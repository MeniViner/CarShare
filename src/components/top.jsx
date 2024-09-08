import React, { useState, useEffect } from "react";
import { auth } from "../data/firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth";
import SideNavigation from "./sideNavigation";


const Top = () => {
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   // מאזין לשינויים במצב המשתמש
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserName(user.displayName || user.email); // הגדרת שם המשתמש או הדוא"ל
  //     } else {
  //       setUserName(""); // אם אין משתמש מחובר
  //     }
  //   });

  //   return () => unsubscribe(); // ניקוי  כשהקומפוננטה מוסרת
  // }, []);

  return (
    <>
      <div className="top-section">
        {/* <Link to="/">
          <IoMdArrowRoundBack />
        </Link> */}
        <div className="side-nav-bt" >
            <SideNavigation/>
          </div>
        {/* <span>
          {userName ? `welcome back, ${userName}.` : "welcome back user"} 
        </span> */}
      </div>
    </>
  );
};

export default Top;
