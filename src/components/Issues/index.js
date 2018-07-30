/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { Map } from 'immutable';
import { List, Avatar } from 'antd';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { Link } from 'react-router-dom';

import { fetchIssues } from 'reducers/content/action';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
class Issues extends Component {
  componentDidMount() {
    const { handleFetchIssues, pageSize } = this.props;
    const { ownerName, repoName } = this.props.match.params;
    handleFetchIssues(ownerName, repoName, pageSize);
  }

  render() {
    const { ownerName, repoName } = this.props.match.params;
    const { issues } = this.props;
    return (
      <div>
        <span>{ownerName}</span>
        <span>{repoName}</span>
        <List
          dataSource={issues.get('items').toJS()}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar shape="square" src={item.user.avatar_url} size="large" />}
                title={
                  <Link to={`/${ownerName}/${repoName}/issues/${item.number}`}>
                    #{item.number} {item.title}
                  </Link>
                }
                description={<ResponsiveEllipsis text={item.body} maxLine="2" ellipsis="..." trimRight basedOn="letters" />}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

Issues.propTypes = {
  handleFetchIssues: PropTypes.func,
  pageSize: PropTypes.number,
  issues: IPropTypes.map,
};

Issues.defaultProps = {
  handleFetchIssues: noop,
  pageSize: 10,
  issues: Map(),
};
const mapStateToProps = state => ({
  issues: state.getIn(['content', 'issues']),
  pageSize: state.getIn(['content', 'pageSize']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchIssues: (ownerName, repoName, pageSize) => dispatch(fetchIssues(ownerName, repoName, pageSize)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issues);
