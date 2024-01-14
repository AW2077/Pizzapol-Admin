import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Panel from './Panel';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import dotenv from 'dotenv';
import "firebase/firestore";
import { SharedDataProvider } from './SharedDataProvider';

 dotenv.config();

function App() {
    const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    signOut(auth);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setAuthenticated(true); // User is signed in
      } else {
        setAuthenticated(false); // No user is signed in
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SharedDataProvider>
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
    </SharedDataProvider>
  );
};

export default App;
