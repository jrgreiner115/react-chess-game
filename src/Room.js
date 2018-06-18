import React, { Component } from 'react';
import Opponent from './Opponent'
import User from './User'

class Room extends Component {

  render() {
    return  (
      <div>
        <Opponent />
        <h3>Place Board here.</h3>
        <User />
      </div>
  )}
}

export default Room;
