import React, {useState} from "react";
import {auth} from "../../firebaseConfig"
import {createUserWithEmailAndPassword} from "firebase/auth"

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User Credential:', userCredential); // Check if this log appears
            })
            .catch((error) => {
                console.log('Error:', error); // Check if this log appears
            });
    }

    return (
        <div>
            <div className='search'>
                <h3>Create account</h3>
                <form onSubmit={handleSignUp}>
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
                    <button type='submit'>Sign up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
