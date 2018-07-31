import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Search, Repos } from 'components';
import { Spin } from 'antd';
import { fetchRepos, setQuery, setCurrentPage } from 'reducers/content/action';

class Home extends Component {
  setQueryOnClick = query => {
    const { handleSetQuery } = this.props;
    Promise.resolve(handleSetQuery(query)).then(() => this.loadResults());
  };

  setPageOnClick = page => {
    const { handleSetCurrentPage } = this.props;
    Promise.resolve(handleSetCurrentPage(page)).then(() => this.loadResults());
  };

  loadResults = () => {
    const { handleFetchRepos, pageSize, currentPage, query } = this.props;
    handleFetchRepos(query, pageSize, currentPage);
  };

  render() {
    const { isLoading, query, error } = this.props;
    return (
      <div>
        <Search setQuery={this.setQueryOnClick} />
        {isLoading && <Spin />}
        {error && <span>Something is not right! </span>}
        {query && !isLoading && !error && <Repos setPage={this.setPageOnClick} />}
      </div>
    );
  }
}

Home.propTypes = {
  handleFetchRepos: PropTypes.func,
  query: PropTypes.string,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  handleSetQuery: PropTypes.func,
  handleSetCurrentPage: PropTypes.func,
};

Home.defaultProps = {
  handleFetchRepos: noop,
  query: 'repositories',
  pageSize: 10,
  currentPage: 1,
  isLoading: false,
  error: null,
  handleSetQuery: noop,
  handleSetCurrentPage: noop,
};

const mapStateToProps = state => ({
  query: state.getIn(['content', 'currentQuery']),
  pageSize: state.getIn(['content', 'pageSize']),
  currentPage: state.getIn(['content', 'currentPage']),
  isLoading: state.getIn(['content', 'isLoading']),
  error: state.getIn(['content', 'error']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchRepos: (query, pageSize, pageNumber) => dispatch(fetchRepos(query, pageSize, pageNumber)),
  handleSetQuery: query => dispatch(setQuery(query)),
  handleSetCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
