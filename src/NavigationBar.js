import React from 'react';
import './NavigationBar.css';
import Makeline from './Makeline';
import Admin from './Admin';
import Dispatch from './Dispatch';

const NavigationBar = ({ handleLinkClick }) => {
  return (
        <div>
          <ul>
          <li className="logo"><img id='pizza-icon' src="pizza.png" alt='company logo'></img>Pizzapol</li>
          <div className="header-right">
            <li><div className='button' onClick={() => handleLinkClick(Makeline)}>Makeline</div></li>
            <li><div className='button' onClick={() => handleLinkClick(Dispatch)}> Dispatch</div></li>
            <li><div className='button' onClick={() => handleLinkClick(Admin)}> Admin</div></li>
          </div>
          </ul>
        </div>   
  );
};

export default NavigationBar;