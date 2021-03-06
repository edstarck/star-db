import React, { Component } from 'react';

// Server API
import SwapiService from '../../services/swapi-service';

// layout
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';

// Error
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

// Style
import './app.css';

class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div className="stardb-app">
        <header>
          <Header />
          {randomPlanet}
        </header>
        <div className="row mb2 button-row">
          <button
            className="btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>
        <PeoplePage />
      </div>
    );
  }
}

export default App;
