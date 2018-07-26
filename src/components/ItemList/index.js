/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { Table } from 'antd';
import { noop } from 'lodash';
import { fetchIssues } from 'reducers/issues/action';

const columns = [
  {
    title: '#',
    dataIndex: 'index',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Stars',
    dataIndex: 'stargazers_count',
    render: value => <span>{value} Stars </span>,
  },
];

class ItemList extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { handleFetchIssues, query, data } = this.props;

    handleFetchIssues('repositories', query, data.get('pageSize'), pagination.current);
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        <p>dziwne</p>

        <Table
          rowKey={({ id }) => `${id}`}
          dataSource={data
            .get('items')
            .map((el, index) => el.set('index', index + 1))
            .toJS()}
          columns={columns}
          onChange={this.handleTableChange}
          pagination={{
            pageSize: data.get('pageSize'),
            total: data.get('total'),
          }}
        />
      </div>
    );
  }
}

ItemList.propTypes = {
  handleFetchIssues: PropTypes.func,
  data: IPropTypes.map,
};

ItemList.defaultProps = {
  handleFetchIssues: noop,
  data: Map(),
};

const mapStateToProps = state => ({
  query: state.getIn(['issues', 'currentQuery']),
  data: state.getIn(['issues', 'data']),
});

const mapDispatchToProps = dispatch => ({
  handleFetchIssues: (scope, query, pageSize, pageNumber) => dispatch(fetchIssues(scope, query, pageSize, pageNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
