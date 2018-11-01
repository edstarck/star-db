import React, { Component } from 'react';

// Server API
import SwapiService from '../../services/swapi-service';

// Components
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../app-row';

// Style
import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedItem: 5,
  };

  onItemSelected = id => {
    this.setState({
      selectedItem: id,
      loading: true,
    });
  };

  render() {
    const { getAllPeople, getPerson, getPersonImage } = this.swapiService;

    const itemList = (
      <ItemList onItemSelected={this.onItemSelected} getData={getAllPeople}>
        {item => `${item.name} (${item.birthYear})`}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedItem}
          loading={this.state.loading}
          getData={getPerson}
          getImageUrl={getPersonImage}
        >
          <Record field="gender" label="Gender" />
          <Record field="eyeColor" label="Eye Color" />
          <Record field="birthYear" label="Birth Year" />
        </ItemDetails>
      </ErrorBoundry>
    );

    return <Row left={itemList} right={itemDetails} />;
  }
}
