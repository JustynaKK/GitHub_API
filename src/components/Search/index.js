import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { setQuery } from 'reducers/content/action';

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
    console.log(this.state.query);
    e.preventDefault();

    const { handleSetQuery } = this.props;
    const { query } = this.state;
    handleSetQuery(query);

    // getContent();
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
  handleSetQuery: PropTypes.func,
};

Search.defaultProps = {
  handleSetQuery: noop,
};

const mapDispatchToProps = dispatch => ({
  handleSetQuery: query => dispatch(setQuery(query)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Search);
