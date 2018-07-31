const express = require('express');
const axios = require('axios');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// get REPOS

app.get('/search/:query/:pageSize/:currentPage', (req, res, next) => {
  const { query, pageSize, currentPage } = req.params;
  axios(`https://api.github.com/search/repositories?q=${query}+language:javascript&sort=stars&order=desc&per_page=${pageSize}&page=${currentPage}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(next);
});

// get ISSUES

app.get('/issues/:ownerName/:repoName/issues/:pageSize', (req, res, next) => {
  const { ownerName, repoName, pageSize } = req.params;
  axios(`https://api.github.com/repos/${ownerName}/${repoName}/issues?per_page=${pageSize}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(next);
});

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
