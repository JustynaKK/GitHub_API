/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Logo, Search, Repos } from 'components';
import { fetchRepos } from 'reducers/content/action';

class Home extends Component {
  componentDidUpdate() {
    const { handleFetchRepos, query, pageSize, currentPage } = this.props;
    handleFetchRepos(query, pageSize, currentPage);
  }

  render() {
    return (
      <div>
        <Search />
        <Repos />
      </div>
    );
  }
}

Home.propTypes = {
  handleFetchRepos: PropTypes.func,
  scope: PropTypes.string,
  query: PropTypes.string,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
};

Home.defaultProps = {
  handleFetchRepos: noop,
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
  handleFetchRepos: (query, pageSize, pageNumber) => dispatch(fetchRepos(query, pageSize, pageNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
