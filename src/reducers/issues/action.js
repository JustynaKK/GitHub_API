import axios from 'axios';
import * as types from './types';

export const fetchIssues = (scope, query) => ({
  type: types.FETCH_POSTS,
  payload: axios(`/search/${scope}/${query}`),
  meta: { query },
});
