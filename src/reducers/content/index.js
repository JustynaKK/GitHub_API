import { fromJS } from 'immutable';
import { FETCH_POSTS_PENDING, FETCH_POSTS_REJECTED, FETCH_POSTS_FULFILLED, SET_QUERY, SET_SCOPE, SET_CURRENTPAGE } from './types';

const initialState = fromJS({
  currentScope: 'repositories',
  currentQuery: null,
  pageSize: 10,
  currentPage: 1,
  isLoading: false,
  error: null,
  data: {
    items: [],
    total: 0,
  },
});

export default function(state = initialState, { type, payload, error }) {
  switch (type) {
    case FETCH_POSTS_PENDING:
      return state.merge({ isLoading: true, error: null });
    case FETCH_POSTS_REJECTED:
      return state.merge({ isLoading: false, error });
    case FETCH_POSTS_FULFILLED:
      return state
        .merge({ isLoading: false, error: null })
        .setIn(['data', 'items'], fromJS(payload.data.items))
        .setIn(['data', 'total'], fromJS(payload.data.total_count));
    case SET_QUERY:
      return state.set('currentQuery', payload);
    case SET_SCOPE:
      return state.set('currentScope', payload);
    case SET_CURRENTPAGE:
      return state.set('currentPage', payload);

    default:
      return state;
  }
}

// export const getCurrentQuery = state => state.getIn(['content', 'currentQuery']);

// export const getCurrentItems = state => state.getIn(['content', 'data', getCurrentQuery(state)]);
