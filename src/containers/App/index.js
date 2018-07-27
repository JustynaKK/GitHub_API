/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Logo, Search, ItemList } from 'components';
import { fetchContent } from 'reducers/content/action';
import './styles.css';

class App extends Component {

  componentDidUpdate() {
    const { handleFetchContent, query, pageSize, currentPage } = this.props;
    handleFetchContent(query, pageSize, currentPage);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="wrapper">
          <Search />
          <ItemList />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleFetchContent: PropTypes.func,
  scope: PropTypes.string,
  query: PropTypes.string,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
};

App.defaultProps = {
  handleFetchContent: noop,
  scope: null,
  query: 'repositories',
  pageSize: 10,
  currentPage: 1,
};

const mapStateToProps = state => ({
  scope: state.getIn(['content', 'currentScope']),
  query: state.getIn(['content', 'currentQuery']),
  pageSize: state.getIn(['content', 'pageSize']),
  currentPage: state.getIn(['content', 'currentPage']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchContent: (query, pageSize, pageNumber) => dispatch(fetchContent(query, pageSize, pageNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
