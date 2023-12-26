import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import {getAuth, signOut } from 'firebase/auth';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: null, // Zaczynamy z pustym komponentem
    };
  }

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


  // Funkcja obsługująca klikanie w NavigationBar
  handleLinkClick = (newComponent) => {
    this.setState({ activeComponent: newComponent });
  };

  // Renderowanie NavigationBar i aktywnego komponentu
  render() {
    const { activeComponent: ActiveComponent } = this.state;

    return (
      <div>
        <NavigationBar handleLinkClick={this.handleLinkClick} />
        {ActiveComponent && <ActiveComponent />}
        <button onClick={this.handleSignOut}> Sign Out</button>
      </div>
    );
  }
}

export default App;
