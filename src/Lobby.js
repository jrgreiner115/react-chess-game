import React, { Component } from 'react';
import Adapter from './services/adapter';

class Lobby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      games: [],
      userId: this.props.appState.currentUserId,
      gameId: null
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
    Adapter.createGame(this.state.userId)
    .then(json=> this.setState({
      gameId: json.id
    }))
    .then(json => this.getGames())
    .then(whatever => this.props.goDirectlyToGame(this.state))
  }

  joinGame = (e) => {
    e.preventDefault()
    Adapter.joinGame(e.target.id, this.state.userId)
    .then(json=> this.setState({
      gameId: json.id
    }))
    .then(whatever => this.props.changeToGame(this.state))
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
          return (<span><li>{game.id}</li><button onClick={this.joinGame} whitePlayer={game.player_id_white} id={game.id}>Join Game </button></span>)
        }) : ""}
      </div>
    )
  }
}

export default Lobby
