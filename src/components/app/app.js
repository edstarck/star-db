import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';

class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: 1,
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div>
        <header>
          <Header />
          {randomPlanet}
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
        </header>
        <main className="row mb2">
          <aside className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </aside>
          <article className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </article>
        </main>
      </div>
    );
  }
}

export default App;
