import React, { Component } from 'react';
import { Radio, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
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
    const { data } = this.props;
    const { scope, query } = this.state;

    handleFetchIssues(scope, query, data.get('pageSize'), data.get('currentPage'));
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
  handleFetchIssues: PropTypes.func,
  data: IPropTypes.map,
};

Search.defaultProps = {
  handleFetchIssues: noop,
  data: Map(),
};

const mapStateToProps = state => ({
  data: state.getIn(['issues', 'data']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchIssues: (scope, query, pageSize, pageNumber) => dispatch(fetchIssues(scope, query, pageSize, pageNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
