import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 1,
    hasError: false,
  };

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id,
      loading: true,
    });
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <main className="row mb2">
        <aside className="col-md-6">
          <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={({ name, gender, birthYear }) =>
              `${name} (${gender}, ${birthYear})`
            }
          />
        </aside>
        <article className="col-md-6">
          <PersonDetails
            personId={this.state.selectedPerson}
            loading={this.state.loading}
          />
        </article>
      </main>
    );
  }
}
