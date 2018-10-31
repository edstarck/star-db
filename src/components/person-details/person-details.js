import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button/error-button';
import Spiner from '../spiner';

import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    loading: false,
  };

  loadedPerson = () => {
    this.setState({
      loading: true,
    });
  };

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService.getPerson(personId).then(person => {
      this.setState({ person, loading: false });
    });
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.loadedPerson();
      this.updatePerson();
    }
  }

  render() {
    const { person, loading } = this.state;

    const primaryText = !person ? (
      <span>Selected a person from a list</span>
    ) : null;
    const spiner = loading ? <Spiner /> : null;
    const hasDate = !(loading || primaryText);
    const context = hasDate ? <CardView person={person} /> : null;

    return (
      <div className="person-details card">
        {primaryText}
        {spiner}
        {context}
      </div>
    );
  }
}

const CardView = props => {
  const { id, name, gender, birthYear, eyeColor } = props.person;

  return (
    <React.Fragment>
      <img
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt={name}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};
