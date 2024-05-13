import React, {useState, useEffect} from 'react';
import {db} from '../data/firebaseConfig';
import {getDocs, collection} from 'firebase/firestore';


async function fetchDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "users"));
    
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
    });
    return data;
}

const Login = () => {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setUserData(data);
        }
        fetchData();
    }, []);

    return (
        <>
            
            <h1 className='user-lofin'>Login</h1>

            <div>
                {userData.map((user) => (
                    <div key={user.id}>
                        <p>{user.name}</p>
                        <p>{user.age}</p>
                        <p>{user.bio}</p>
                    </div>
                ))}    
            </div>   
        </>
    );
};

export default Login;