import React, { useState } from "react";

const UserProfile = () => {

    const [userName, setUserName] = useState(); 

    return (
        <>
            <h1>Wellcome {userName} </h1>
        </>
    );
}

export default UserProfile;