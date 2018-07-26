const express = require('express');
const axios = require('axios');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/search/:scope/:query/:pageSize/:pageNumber', (req, res, next) => {
  const { scope, query, pageSize, pageNumber } = req.params;
  axios(`https://api.github.com/search/${scope}?q=${query}+language:javascript&sort=stars&order=desc&per_page=${pageSize}&page=${pageNumber}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(next);
});

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
