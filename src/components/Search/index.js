import React, { Component } from 'react';
import { Radio, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { setQuery, setScope } from 'reducers/content/action';

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
    console.log('i am in scope', e.target.value);

    this.setState({
      scope: e.target.value,
    });
  };

  handleOnClick = e => {
    console.log(this.state.scope);
    console.log(this.state.query);
    e.preventDefault();

    const { handleSetQuery, handleSetScope } = this.props;
    const { query, scope } = this.state;
    handleSetQuery(query);
    handleSetScope(scope);

    // getContent();
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
          <Radio style={radioStyle} value="issues">
            Content
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
  handleSetQuery: PropTypes.func,
  handleSetScope: PropTypes.func,
};

Search.defaultProps = {
  handleSetQuery: noop,
  handleSetScope: noop,
};

const mapDispatchToProps = dispatch => ({
  handleSetQuery: query => dispatch(setQuery(query)),
  handleSetScope: scope => dispatch(setScope(scope)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Search);
