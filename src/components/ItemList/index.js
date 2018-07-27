import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import { Table } from 'antd';
import { noop } from 'lodash';
import { setCurrentPage } from 'reducers/content/action';

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
  handleTableChange = pagination => {
    const { handleSetCurrentPage } = this.props;
    handleSetCurrentPage(pagination.current);
  };

  render() {
    const { data } = this.props;
    console.log(data.toJS());

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
  handleSetCurrentPage: PropTypes.func,
  data: IPropTypes.map,
};

ItemList.defaultProps = {
  handleSetCurrentPage: noop,
  data: Map(),
};

const mapStateToProps = state => ({
  data: state.getIn(['content', 'data']),
});

const mapDispatchToProps = dispatch => ({
  handleSetCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList);
