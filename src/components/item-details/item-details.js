import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button/error-button';
import Spiner from '../spiner';

import './item-details.css';

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: false,
  };

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then(item => {
      this.setState({ item, loading: false, image: getImageUrl(item) });
    });
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loading: true,
      });
      this.updateItem();
    }
  }

  render() {
    const { item, loading, image } = this.state;

    const record = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { item });
    });

    const primaryText = !item ? (
      <span>Selected a person from a list</span>
    ) : null;
    const spiner = loading ? <Spiner /> : null;
    const hasDate = !(loading || primaryText);
    const context = hasDate ? (
      <CardView name={item.name} image={image} record={record} />
    ) : null;

    return (
      <section className="person-details card">
        {primaryText}
        {spiner}
        {context}
      </section>
    );
  }
}

const CardView = props => {
  const { name, image, record } = props;

  return (
    <React.Fragment>
      <img className="person-image" src={image} alt={name} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">{record}</ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };
