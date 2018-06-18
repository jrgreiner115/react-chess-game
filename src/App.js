import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state: {
    rooms: []
  }
  render() {
    return (
      <div className="App">
        <div>
          <p>login/out</p>
        </div>
        <h1>U PLAY CHESS?????</h1>
        <div className='room'>
          <Room />
          <>Here's the room.</h3>
        </div>
      </div>
    );
  }
}

export default App;
