import React, { Component } from 'react';
import Opponent from './Opponent';
import User from './User';
import Board from './Board';
import Adapter from './services/adapter';

class Room extends Component {
  constructor(props){
    super(props)

    this.state = {
      // THIS BOOLEAN IS CONFUSING BUT EASIER THAN A TEXT MATCH, MAYBE? WHITE IS TRUE, BLACK IS FALSE. GAME STARTS W WHITE.
      activePlayer: true
    }
  }

  componentDidMount = () => {
    // if Adapter.gameId === 0 || Adapter.gameId % 2 === 0
    // Adapter.createGame()
    // else
      Adapter.getGame()
  }


  turnOperator = () => {
    this.setState({
      activePlayer: !this.state.activePlayer
    })
  }

  render() {
    return  (
      <div>
        <Board className='board' appState={this.props.appState}/>
      </div>
  )}
}

export default Room;
