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
        <h2>
          Welcome!
        </h2>
        <h3>Create a game:</h3>
        <button
          className='btn'
          onClick={this.createGame}>Create Game</button>

        <h3>Join a game</h3>
        {this.state.games.length > 0 ? this.state.games.map(game => {
          return (<span><li>{game.id}</li>
            <button
              className='btn'
             onClick={this.joinGame} whitePlayer={game.player_id_white} id={game.id}>Join Game </button></span>)
        }) : ""}
      </div>
    )
  }
}

export default Lobby
