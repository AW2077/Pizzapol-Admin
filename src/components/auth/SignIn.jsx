import React, {useState} from "react";
import {auth} from "../../firebaseConfig"
import {signInWithEmailAndPassword} from "firebase/auth"

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Define isAuthenticated state


    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User Credential:', userCredential); // Check if this log appears
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
