import React, { Component } from 'react';

// Server API
import SwapiService from '../../services/swapi-service';

// layout
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import Row from '../app-row';

import ItemDetails, { Record } from '../item-details';

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

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
        <Record field="birthYear" label="Birth Year" />
      </ItemDetails>
    );
    const starshipDetails = (
      <ItemDetails
        itemId={12}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="manufacturer" label="Manufacturer" />
      </ItemDetails>
    );

    return (
      <div className="stardb-app">
        <header>
          <Header />
          {/* randomPlanet */}
        </header>
        {/* <div className="row mb2 button-row">
          <button
            className="btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div> */}
        {/* <PeoplePage /> */}

        <Row left={personDetails} right={starshipDetails} />
      </div>
    );
  }
}

export default App;
