/*eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { List, Avatar, Icon } from 'antd';
import { noop } from 'lodash';
import { setCurrentPage } from 'reducers/content/action';
import { Link } from 'react-router-dom';

class Repos extends Component {
  handleListChange = page => {
    const { handleSetCurrentPage } = this.props;
    handleSetCurrentPage(page);
  };

  render() {
    const { repos, pageSize } = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 20 }} />
        {text}
      </span>
    );

    return (
      <div>
        <List
          pagination={{
            onChange: this.handleListChange,
            pageSize,
            total: repos.get('total'),
          }}
          dataSource={repos.get('items').toJS()}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <IconText type="star-o" text={item.stargazers_count} />,
                <IconText type="fork" text={item.forks_count} />,
                <IconText
                  type={'exclamation-circle-o'}
                  text={<Link to={`/${item.owner.login}/${item.name}/issues`}> Issues: {item.open_issues_count} </Link>}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" src={item.owner.avatar_url} size="large" />}
                title={<a href={item.html_url}>{item.full_name}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

Repos.propTypes = {
  handleSetCurrentPage: PropTypes.func,
  pageSize: PropTypes.number,
  repos: IPropTypes.map,
};

Repos.defaultProps = {
  handleSetCurrentPage: noop,
  repos: Map(),
  pageSize: 10,
};

const mapStateToProps = state => ({
  repos: state.getIn(['content', 'repos']),
  pageSize: state.getIn(['content', 'pageSize']),
});

const mapDispatchToProps = dispatch => ({
  handleSetCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repos);
