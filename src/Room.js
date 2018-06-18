import React, { Component } from 'react';
import Opponent from './Opponent'
import Board from './Board.js'
import User from './User'

class Room extends Component {
  constructor(props){
    super(props)

    this.state = {
      // THIS BOOLEAN IS CONFUSING BUT EASIER THAN A TEXT MATCH, MAYBE? WHITE IS TRUE, BLACK IS FALSE. GAME STARTS W WHITE.
      activePlayer: true
    }
  }


  turnOperator = () => {
    this.setState({
      activePlayer: !this.state.activePlayer
    })
  }

  render() {
    return  (
      <div>
        <Opponent />
        <Board />
        <User checkTurnOperator={this.turnOperator} turn={this.state.activePlayer}/>
      </div>
  )}
}

export default Room;
