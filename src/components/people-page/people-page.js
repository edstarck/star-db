import React, { Component } from 'react';

// Server API
import SwapiService from '../../services/swapi-service';

// Components
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorBoundry from '../error-boundry';
import Row from '../app-row';

// Style
import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 5,
  };

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id,
      loading: true,
    });
  };

  render() {
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {item => `${item.name} (${item.birthYear})`}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails
          personId={this.state.selectedPerson}
          loading={this.state.loading}
        />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={personDetails} />;
  }
}
