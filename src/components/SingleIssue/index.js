/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Map } from 'immutable';

import { fetchIssueSingle } from 'reducers/content/action';
import { fetchIssueComments } from 'reducers/content/action';

class SingleIssue extends Component {
  componentDidMount() {
    const { handleFetchIssueSingle, handleFetchIssueComments } = this.props;
    const { ownerName, repoName, number } = this.props.match.params;
    handleFetchIssueSingle(ownerName, repoName, number);
    // handleFetchIssueComments(ownerName, repoName, number);
  }

  render() {
    const { ownerName, repoName } = this.props.match.params;
    const { issue, comments } = this.props;
    console.log(issue, comments);
    return (
      <div>
        <span>{ownerName}</span>
        <span>{repoName}</span>
      </div>
    );
  }
}

SingleIssue.propTypes = {
  handleFetchIssueSingle: PropTypes.func,
  // handleFetchIssueComments: PropTypes.func,
};

SingleIssue.defaultProps = {
  handleFetchIssueSingle: noop,
  // handleFetchIssueComments: noop,
};

const mapDispatchToProps = dispatch => ({
  handleFetchIssueSingle: (ownerName, repoName, number) => dispatch(fetchIssueSingle(ownerName, repoName, number)),
  // handleFetchIssueComments: (ownerName, repoName, number) => dispatch(fetchIssueComments(ownerName, repoName, number)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SingleIssue);
