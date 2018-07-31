import React, { Component } from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

class Search extends Component {
  state = {
    query: '',
  };

  handleOnChangeQuery = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleOnClick = e => {
    e.preventDefault();
    const { setQuery } = this.props;
    const { query } = this.state;
    setQuery(query);
  };

  render() {
    return (
      <div>
        <div>
          <Input type="text" placeholder="Search for repo" name="city" onChange={this.handleOnChangeQuery} value={this.state.query} />
          <Button type="primary" icon="search" onClick={this.handleOnClick}>
            Search
          </Button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  setQuery: PropTypes.func,
};

Search.defaultProps = {
  setQuery: noop,
};

export default Search;
