import axios from 'axios';
import * as types from './types';

export const fetchIssues = (scope, query, pageSize, pageNumber) => ({
  type: types.FETCH_POSTS,
  payload: axios(`/search/${scope}/${query}/${pageSize}/${pageNumber}`),
  meta: { query },
});
