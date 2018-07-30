import { fromJS } from 'immutable';
import {
  FETCH_REPOS_PENDING,
  FETCH_REPOS_REJECTED,
  FETCH_REPOS_FULFILLED,
  SET_QUERY,
  SET_SCOPE,
  SET_CURRENTPAGE,
  FETCH_ISSUES_FULFILLED,
  FETCH_ISSUE_SINGLE_FULFILLED,
  FETCH_ISSUE_COMMENTS_FULFILLED,
} from './types';

const initialState = fromJS({
  currentQuery: null,
  pageSize: 10,
  currentPage: 1,
  isLoading: false,
  error: null,
  repos: {
    items: [],
    total: 0,
  },
  issues: {
    items: {},
  },
  issue: {},
  comments: [],
});

export default function(state = initialState, { type, payload, error }) {
  switch (type) {
    case SET_QUERY:
      return state.set('currentQuery', payload);
    case SET_SCOPE:
      return state.set('currentScope', payload);
    case SET_CURRENTPAGE:
      return state.set('currentPage', payload);
    case FETCH_REPOS_PENDING:
      return state.merge({ isLoading: true, error: null });
    case FETCH_REPOS_REJECTED:
      return state.merge({ isLoading: false, error });
    case FETCH_REPOS_FULFILLED:
      return state
        .merge({ isLoading: false, error: null })
        .setIn(['repos', 'items'], fromJS(payload.data.items))
        .setIn(['repos', 'total'], fromJS(payload.data.total_count));
    case FETCH_ISSUES_FULFILLED:
      return state.merge({ isLoading: false, error: null }).setIn(['issues', 'items'], fromJS(payload.data));
    case FETCH_ISSUE_SINGLE_FULFILLED:
      return state.merge({ isLoading: false, error: null }).setIn(['issue'], fromJS(payload.data));
    case FETCH_ISSUE_COMMENTS_FULFILLED:
      return state.merge({ isLoading: false, error: null }).setIn(['comments'], fromJS(payload.data));

    default:
      return state;
  }
}

// export const getCurrentQuery = state => state.getIn(['content', 'currentQuery']);

// export const getCurrentItems = state => state.getIn(['content', 'repos', getCurrentQuery(state)]);
