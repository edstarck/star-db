import React, { Component } from 'react';

// Server API
import SwapiService from '../../services/swapi-service';

// Components
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import Row from '../app-row';

// Style
import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 5,
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

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem={({ name, gender, birthYear }) =>
          `${name} (${gender}, ${birthYear})`
        }
      />
    );

    const personDetails = (
      <PersonDetails
        personId={this.state.selectedPerson}
        loading={this.state.loading}
      />
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
