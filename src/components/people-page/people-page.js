import React, { Component } from 'react';

import { PeopleList, PeopleDetails } from '../sw-components';

import ErrorBoundry from '../error-boundry';
import Row from '../app-row';

import './people-page.css';

export default class PeoplePage extends Component {
  state = {
    itemId: 5,
  };

  onItemSelected = id => {
    this.setState({
      itemId: id,
      loading: true,
    });
  };

  render() {
    const itemList = (
      <PeopleList onItemSelected={this.onItemSelected}>
        {item => `${item.name} (${item.birthYear})`}
      </PeopleList>
    );

    const itemDetails = (
      <ErrorBoundry>
        <PeopleDetails itemId={this.state.itemId} />
      </ErrorBoundry>
    );

    return <Row left={itemList} right={itemDetails} />;
  }
}
