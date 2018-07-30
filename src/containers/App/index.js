/* eslint-disable */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Logo } from 'components';

import { Home } from 'containers';
import { Issues, SingleIssue } from 'components';
import './styles.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Logo />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router>
          <div className="wrapper">
            <Route exact path="/" component={Home} />
            <Route exact path="/:ownerName/:repoName/issues" component={Issues} />
            <Route exact path="/:ownerName/:repoName/issues/:number" component={SingleIssue} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
