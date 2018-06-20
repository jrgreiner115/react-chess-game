import React, { Component } from 'react';
import Adapter from './services/adapter';

class WaitingRoom extends Component {

  componentDidMount() {
      // Adapter.joinOrCreateGame()
  }

  render() {
    return (
      <div>
        <h1>
          Welcome!
        </h1>
        <h2>Waiting for Other Player...</h2>
      </div>
    )
  }
}

export default WaitingRoom
