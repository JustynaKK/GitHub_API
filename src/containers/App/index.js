import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Logo, Issues } from 'components';
import { Home } from 'containers';

import './styles.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <Logo />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <Router>
      <div className="wrapper">
        <Route exact path="/" component={Home} />
        <Route exact path="/:ownerName/:repoName/issues" component={Issues} />
      </div>
    </Router>
  </div>
);

export default App;
