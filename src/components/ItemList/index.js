import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { List, Avatar, Icon } from 'antd';
import { noop } from 'lodash';
import { setCurrentPage } from 'reducers/content/action';
import { Link } from 'react-router-dom';

class ItemList extends Component {
  handleListChange = page => {
    console.log(page);
    const { handleSetCurrentPage } = this.props;
    handleSetCurrentPage(page);
  };

  render() {
    const { data, pageSize } = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 20 }} />
        {text}
      </span>
    );

    return (
      <div>
        <List
          // itemLayout="vertical"
          pagination={{
            onChange: this.handleListChange,
            pageSize,
            total: data.get('total'),
          }}
          dataSource={data.get('items').toJS()}
          renderItem={item => (
            console.log(item.open_issues_count),
            (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="star-o" text={item.stargazers_count} />,
                  <IconText type="fork" text={item.forks_count} />,
                  <IconText type="exclamation-circle-o" text={`Issues: ${item.open_issues_count}`} />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="square" src={item.owner.avatar_url} size="large" />}
                  title={<a href={item.html_url}>{item.full_name}</a>}
                  description={<Link to={/}/>}
                />
              </List.Item>
            )
          )}
        />
      </div>
    );
  }
}

ItemList.propTypes = {
  handleSetCurrentPage: PropTypes.func,
  pageSize: PropTypes.number,
  data: IPropTypes.map,
};

ItemList.defaultProps = {
  handleSetCurrentPage: noop,
  data: Map(),
  pageSize: 10,
};

const mapStateToProps = state => ({
  data: state.getIn(['content', 'data']),
  pageSize: state.getIn(['content', 'pageSize']),
});

const mapDispatchToProps = dispatch => ({
  handleSetCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
