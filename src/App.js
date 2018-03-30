import React, { Component } from 'react';
import Bracket from './Bracket';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Bracket appInitData={this.props.appInitData}/>
      </div>
    );
  }
}

export default App;
