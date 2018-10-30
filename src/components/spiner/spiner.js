import React, { Component } from 'react';

import './spiner.css';

export default class Spiner extends Component {
  render() {
    return (
      <div className="lds-spiner lds-css ng-scope">
        <div className="lds-double-ring">
          <div />
          <div />
        </div>
      </div>
    );
  }
}
