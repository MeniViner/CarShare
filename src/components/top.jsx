import React from 'react';



const Top = ({userName}) => {

    return (
        <>
            <div className="top">
                <h3> wellcome back {"${UserName}"}</h3>
                {/* <h1>Wellcome back {userName} </h1> */}
            </div>    
        </>
    );
};

export default Top;