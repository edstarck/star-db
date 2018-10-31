import React, { Component } from 'react';

// Server API
import SwapiService from '../../services/swapi-service';

// Components
import ItemList from '../item-list';
import ItemDetails from '../item-details';
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
    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.swapiService.getAllPeople}
      >
        {item => `${item.name} (${item.birthYear})`}
      </ItemList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedItem}
          loading={this.state.loading}
        />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={itemDetails} />;
  }
}
