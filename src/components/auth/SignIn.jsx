import React, {useState} from "react";
import {auth} from "../../firebaseConfig"
import {signInWithEmailAndPassword} from "firebase/auth"
import { useSharedData } from "../../SharedDataProvider";

const SignIn = () => {
    const { updateStoreName, setIsAuthenticated } = useSharedData();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getStoreData = async(storeId) => {
        const body = {storeId: storeId};
        const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://getdistrictname-ovvvjoo5mq-uc.a.run.app");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "https://getdistrictname-ovvvjoo5mq-uc.a.run.app");
            xhr.setRequestHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
            xhr.setRequestHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            
            xhr.onload = () => {
                if (xhr.readyState === 4 && xhr.status === 201) {
                    const response = JSON.parse(xhr.responseText);
                    const storeName = response.district;
                    updateStoreName(storeName);
                } else {
                    console.log(`Error: ${xhr.status}, Details: ${xhr.responseText}`);
                }
            };
            xhr.send(JSON.stringify(body));
      }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
      
    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log('User Credential:', userCredential); // Check if this log appears
                // console.log('Store Id:', userCredential._tokenResponse.localId); // Check if this log appears
                const storeId = userCredential._tokenResponse.localId;
                getStoreData(storeId);

                const districtName = capitalizeFirstLetter(email.split('@')[0]);
                localStorage.setItem('districtName', districtName);

                setIsAuthenticated(true); // Set authenticated to true after successful sign-in
            })
            .catch((error) => {
                console.log('Error:', error); // Check if this log appears
            });
    };

    return (
        <div>
            <div className='search'>
                <h3>Login</h3>
                <form onSubmit={handleSignIn}>
                    <label>
                        Email:
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label><br />
                    <label>
                        Password:
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label><br />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
