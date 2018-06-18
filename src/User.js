import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: this.props.turn
    }
  }



  render() {
    console.log("state is", this.state);
    return (
      <div>
        {this.state.activePlayer ? <p>It's Your Turn.</p>: <p>Opponent's Turn.</p>}
      </div>
    )
  }
}

export default User
