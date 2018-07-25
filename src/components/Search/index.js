import React, { Component } from 'react';
import { Radio, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { fetchIssues } from 'reducers/issues/action';

const RadioGroup = Radio.Group;

class Search extends Component {
  state = {
    query: '',
    scope: 'repositories',
  };

  handleOnChangeQuery = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleOnChangeScope = e => {
    this.setState({
      scope: e.target.value,
    });
  };

  handleOnClick = e => {
    e.preventDefault();

    const { handleFetchIssues } = this.props;
    const { scope, query } = this.state;
    console.log(query, 'query');

    handleFetchIssues(scope, query);
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div>
        <h2>Select scope:</h2>
        <RadioGroup onChange={this.handleOnChangeScope} value={this.state.scope}>
          <Radio style={radioStyle} value="repositories">
            Repsitories
          </Radio>
          <Radio style={radioStyle} value="issues" disabled>
            Issues
          </Radio>
        </RadioGroup>

        <div>
          <Input type="text" placeholder="Search for repo" name="city" onChange={this.handleOnChangeQuery} />
          <Button type="primary" icon="search" onClick={this.handleOnClick}>
            Search
          </Button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  handleFetchIssues: PropTypes.func,
};

Search.defaultProps = {
  handleFetchIssues: noop,
};

const mapDispatchToProps = dispatch => ({
  handleFetchIssues: (scope, query) => dispatch(fetchIssues(scope, query)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Search);
