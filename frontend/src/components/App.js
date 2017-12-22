import React, { Component } from 'react';
import PoolList from './PoolList/';
import Header from './templates/Header'

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
