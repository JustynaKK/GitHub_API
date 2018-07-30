import axios from 'axios';
import * as types from './types';

export const fetchRepos = (query, pageSize, currentPage) => ({
  type: types.FETCH_REPOS,
  payload: axios(`/search/${query}/${pageSize}/${currentPage}`),
});

export const fetchIssues = (ownerName, repoName, pageSize) => ({
  type: types.FETCH_ISSUES,
  payload: axios(`/repos/${ownerName}/${repoName}/issues/${pageSize}`),
});

export const fetchIssueSingle = (ownerName, repoName, number) => ({
  type: types.FETCH_ISSUE_SINGLE,
  payload: axios(`/repos/${ownerName}/${repoName}/issues/${number}`),
});

export const fetchIssueComments = (ownerName, repoName, number) => ({
  type: types.FETCH_ISSUE_COMMENTS,
  payload: axios(`/repos/${ownerName}/${repoName}/issues/${number}/comments`),
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
