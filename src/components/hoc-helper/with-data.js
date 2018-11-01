import React, { Component } from 'react';
import Spiner from '../spiner';
import ErrorIndicator from '../error-indicator';

const withData = (View, getData) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
    };

    onError = err => {
      this.setState({
        error: true,
      });
    };

    componentDidMount() {
      getData()
        .then(data => {
          this.setState({ data });
        })
        .catch(this.onError);
    }

    render() {
      const { data, error } = this.state;
      const spiner = !(data || error);

      if (spiner) {
        return <Spiner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
