import React from 'react';
import './NavigationBar.css';
import Makeline from './Makeline';
import Admin from './Admin';
import Dispatch from './Dispatch';
import {getAuth, signOut } from 'firebase/auth';

const NavigationBar = ({ handleLinkClick, handleSignOut }) => {

  handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Perform any additional actions after sign-out if needed
        console.log('User signed out successfully');
      })
      .catch((error) => {
        // Handle sign-out errors if any
        console.error('Error signing out:', error);
      });
  };

  return (
        <div>
          <ul>
          <li className="logo"><img id='pizza-icon' src="pizza.png" alt='company logo'></img>Pizzapol</li>
          <div className="header-right">
            <li><div className='button' onClick={() => handleLinkClick(Makeline)}>Makeline</div></li>
            <li><div className='button' onClick={() => handleLinkClick(Dispatch)}> Dispatch</div></li>
            <li><div className='button' onClick={() => handleLinkClick(Admin)}> Admin</div></li>
            <li><div className='button'onClick={() => handleSignOut()}> Sign Out</div></li>

          </div>
          </ul>
        </div>   
  );
};

export default NavigationBar;