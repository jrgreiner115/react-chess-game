import React, { Component } from 'react';
import Opponent from './Opponent'
import User from './User'
import Board from './Board'

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
        <h3>Place Board here.</h3>
        <User checkTurnOperator={this.turnOperator} turn={this.state.activePlayer}/>
      </div>
  )}
}

export default Room;
