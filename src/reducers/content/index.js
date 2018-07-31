import { fromJS } from 'immutable';
import typeToReducer from 'type-to-reducer';
import * as types from './types';

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
});

export default typeToReducer(
  {
    [types.SET_QUERY]: (state, { payload }) => state.set('currentQuery', payload),
    [types.SET_CURRENTPAGE]: (state, { payload }) => state.set('currentPage', payload),

    [types.FETCH_REPOS]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) =>
        state
          .merge({ isLoading: false, error: null })
          .setIn(['repos', 'items'], fromJS(data.items))
          .setIn(['repos', 'total'], fromJS(data.total_count)),
    },
    [types.FETCH_ISSUES]: {
      PENDING: state => state.merge({ isLoading: true, error: null }),
      REJECTED: (state, { error }) => state.merge({ isLoading: false, error }),
      FULFILLED: (state, { payload: { data } }) => state.merge({ isLoading: false, error: null }).setIn(['issues', 'items'], fromJS(data)),
    },
  },
  initialState,
);
