import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'
import Room from './Room.js'

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
        </div>
      </div>
    );
  }
}

export default App;
