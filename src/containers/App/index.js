import React from 'react';
import { Logo, Search, ItemList } from 'components';
import './styles.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <Logo />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <div className="wrapper">
      <Search />
      <ItemList />
    </div>
  </div>
);

export default App;
