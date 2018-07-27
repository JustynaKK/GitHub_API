import axios from 'axios';
import * as types from './types';

export const fetchContent = (scope, query, pageSize, currentPage) => ({
  type: types.FETCH_POSTS,
  payload: axios(`/search/${scope}/${query}/${pageSize}/${currentPage}`),
});

export const setQuery = query => ({
  type: types.SET_QUERY,
  payload: query,
});

export const setScope = scope => ({
  type: types.SET_SCOPE,
  payload: scope,
});

export const setCurrentPage = currentPage => ({
  type: types.SET_CURRENTPAGE,
  payload: currentPage,
});
