import React, { Component } from 'react';
import NavigationBar from './NavigationBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: null,
    };
  }

  handleLinkClick = (newComponent) => {
    this.setState({ activeComponent: newComponent });
  };

  render() {
    const { activeComponent: ActiveComponent } = this.state;

    return (
      <div>
        <NavigationBar handleLinkClick={this.handleLinkClick} />
        {ActiveComponent && <ActiveComponent />}
        </div>
    );
  }
}

export default App;
