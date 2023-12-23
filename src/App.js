import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Panel from './Panel';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import dotenv from 'dotenv';
import "firebase/firestore";
import { DataProvider } from './DataProvider';



 dotenv.config();

 const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
// import dotenv from 'dotenv';
// dotenv.config();




function App() {
    const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true); // User is signed in
      } else {
        setAuthenticated(false); // No user is signed in
      }
    });

    // Clean-up subscription on unmount or whenever needed
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={authenticated ? <Navigate to="/panel" /> : <Login />}
            />
          <Route
            path="/panel"
            element={authenticated ? <Panel /> : <Navigate to="/login" />}
            />
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
