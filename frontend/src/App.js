import React, { Component } from 'react';
import PoolList from './PoolList';
import Header from './Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        
        <PoolList />
        
      </div> 
    );
  }
}

export default App;
