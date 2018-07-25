import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import IPropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

import { getCurrentItems } from 'reducers/issues';

class ItemList extends PureComponent {
  render() {
    const { items } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Repo Name</th>
              <th>Stars Count</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.get('name')}</td>
                <td>{item.get('stargazers_count')} Stars</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {items.map((Item) => <Item>{item.get('name')} </Item>)} */}
      </div>
    );
  }
}

ItemList.propTypes = {
  items: IPropTypes.list,
};

ItemList.defaultProps = {
  items: List(),
};

const mapStateToProps = state => ({
  items: getCurrentItems(state),
});

export default connect(
  mapStateToProps,
  null,
)(ItemList);

// const Item = ({ item, index }) => (
//   <tr>
//     <td>{index + 1}</td>
//     <td>{item.get('name')}</td>
//     <td>{item.get('stargazers_count')} Stars</td>
//   </tr>
// );
// {items.map((item, index) => <Item item={item} index={index} key={item.id} />)}
