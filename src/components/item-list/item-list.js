import React, { Component } from 'react';
import Spiner from '../spiner';

import './item-list.css';

export default class ItemList extends Component {
  state = {
    itemList: null,
  };

  componentDidMount() {
    const { getData } = this.props;

    getData().then(itemList => {
      this.setState({ itemList });
    });
  }

  renderItems(arr) {
    return arr.map(item => {
      const { id } = item;
      const label = this.props.children(item);

      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;
    const items = !itemList ? <Spiner /> : this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
