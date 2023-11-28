import React from 'react';
import './NavigationBar.css';
import Makeline from './Makeline';
import Admin from './Admin';
import Order from './Order';
import Dispatch from './Dispatch';

const NavigationBar = ({ handleLinkClick }) => {
  return (
        <div>
          <ul>
          <li class="logo"><img id='pizza-icon' src="pizza.png" alt='company logo'></img>Pizzapol</li>
          <div class="header-right">
            <li><a onClick={() => handleLinkClick(Makeline)}>Makeline</a></li>
            <li><a onClick={() => handleLinkClick(Dispatch)}> Dispatch</a></li>
            <li><a onClick={() => handleLinkClick(Order)}> Order entry</a></li>
            <li><a onClick={() => handleLinkClick(Admin)}> Admin</a></li>
          </div>
          </ul>
        </div>   
  );
};

export default NavigationBar;