import { fromJS } from 'immutable';
import { FETCH_POSTS_PENDING, FETCH_POSTS_REJECTED, FETCH_POSTS_FULFILLED } from './types';

const initialState = fromJS({
  currentQuery: null,
  isLoading: false,
  error: null,
  data: {
    items: [],
    total: 0,
    pageSize: 10,
    currentPage: 0,
  },
});

export default function(state = initialState, { type, meta, payload, error }) {
  switch (type) {
    case FETCH_POSTS_PENDING:
      return state.merge({ isLoading: true, error: null });
    case FETCH_POSTS_REJECTED:
      return state.merge({ isLoading: false, error });
    case FETCH_POSTS_FULFILLED:
      return state
        .merge({ isLoading: false, error: null, currentQuery: meta.query })
        .setIn(['data', 'items'], fromJS(payload.data.items))
        .setIn(['data', 'total'], fromJS(payload.data.total_count));

    default:
      return state;
  }
}

// export const getCurrentQuery = state => state.getIn(['issues', 'currentQuery']);

// export const getCurrentItems = state => state.getIn(['issues', 'data', getCurrentQuery(state)]);
