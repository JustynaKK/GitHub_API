import { fromJS } from 'immutable';
import { FETCH_POSTS_PENDING, FETCH_POSTS_REJECTED, FETCH_POSTS_FULFILLED } from './types';

const initialState = fromJS({
  currentQuery: null,
  isLoading: false,
  error: null,
  items: {},
});

export default function(state = initialState, { type, meta, payload }) {
  switch (type) {
    case FETCH_POSTS_PENDING:
      return state;
    case FETCH_POSTS_FULFILLED:
      return state.set('currentQuery', meta.query).setIn(['items', meta.query], fromJS(payload.data.items));
    case FETCH_POSTS_REJECTED:
      return state;

    default:
      return state;
  }
}

export const getCurrentQuery = state => state.getIn(['issues', 'currentQuery']);

export const getCurrentItems = state => state.getIn(['issues', 'items', getCurrentQuery(state)]);
