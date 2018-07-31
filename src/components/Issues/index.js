import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Map } from 'immutable';
import { List, Avatar, Spin } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { fetchIssues } from 'reducers/content/action';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
class Issues extends Component {
  componentDidMount() {
    const { handleFetchIssues, pageSize } = this.props;
    const { ownerName, repoName } = this.props.match.params; // eslint-disable-line
    handleFetchIssues(ownerName, repoName, pageSize);
  }

  render() {
    const { ownerName, repoName } = this.props.match.params;
    const { issues, isLoading, error } = this.props;
    return (
      <div>
        <h2>
          Open issues for {ownerName} / {repoName}
        </h2>
        {isLoading && <Spin />}
        {error && <span>Something is not right! </span>}
        {issues.get('items').toJS().length > 0 &&
          !isLoading &&
          !error && (
            <List
              dataSource={issues.get('items').toJS()}
              renderItem={item => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" src={item.user.avatar_url} size="large" />}
                    title={
                      <h4>
                        #{item.number} {item.title}{' '}
                      </h4>
                    }
                    description={<ResponsiveEllipsis text={item.body} maxLine="2" ellipsis="..." trimRight basedOn="letters" />}
                  />
                </List.Item>
              )}
            />
          )}
      </div>
    );
  }
}

Issues.propTypes = {
  handleFetchIssues: PropTypes.func,
  pageSize: PropTypes.number,
  issues: IPropTypes.map,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

Issues.defaultProps = {
  handleFetchIssues: noop,
  pageSize: 10,
  issues: Map(),
  isLoading: false,
  error: false,
};
const mapStateToProps = state => ({
  issues: state.getIn(['content', 'issues']),
  pageSize: state.getIn(['content', 'pageSize']),
  isLoading: state.getIn(['content', 'isLoading']),
  error: state.getIn(['content', 'error']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchIssues: (ownerName, repoName, pageSize) => dispatch(fetchIssues(ownerName, repoName, pageSize)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issues);
