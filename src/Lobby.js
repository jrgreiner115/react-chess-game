import React, { Component } from 'react';
import Adapter from './services/adapter';

class Lobby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      userId: this.props.appState.currentUserId
    }
  }


  componentDidMount() {
    this.getGames()
  }

  getGames = () => {
    Adapter.getGames().then(json => this.setState({
      games: [...json]
    }))
  }

  createGame = (e) => {
    e.preventDefault()
    Adapter.createGame(this.state.userId).then(json => this.getGames())
  }

  joinGame = (e) => {
    e.preventDefault()
    console.log(e.target);
    // Adapter.joinGame(this.state.userId)
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>
          Welcome!
        </h1>
        <h2>Create a Game</h2>
        <button onClick={this.createGame}>Create Game</button>

        <h2>Join a Game</h2>
        {this.state.games.length > 0 ? this.state.games.map(game => {
          return (<span><li>{game.id}</li><button onClick={this.joinGame}>Join Game</button></span>)
        }) : ""}
      </div>
    )
  }
}

export default Lobby
