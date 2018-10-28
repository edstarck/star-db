import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
          <RandomPlanet />
        </header>
        <main className="row mb2">
          <aside className="col-md-6">
            <ItemList />
          </aside>
          <article className="col-md-6">
            <PersonDetails />
          </article>
        </main>
      </div>
    );
  }
}

export default App;
