import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Panel from './Panel';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

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
  );
}

export default App;
