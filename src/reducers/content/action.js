import axios from 'axios';
import * as types from './types';

export const fetchRepos = (query, pageSize, currentPage) => ({
  type: types.FETCH_REPOS,
  payload: axios(`/search/${query}/${pageSize}/${currentPage}`),
});

export const fetchIssues = (ownerName, repoName, pageSize) => ({
  type: types.FETCH_ISSUES,
  payload: axios(`/issues/${ownerName}/${repoName}/issues/${pageSize}`),
});

export const setQuery = query => ({
  type: types.SET_QUERY,
  payload: query,
});

export const setCurrentPage = currentPage => ({
  type: types.SET_CURRENTPAGE,
  payload: currentPage,
});
