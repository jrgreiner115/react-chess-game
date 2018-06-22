import React, { Component } from 'react';
import './App.css';
import Room from './Room.js'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login.js'
import WaitingRoom from './WaitingRoom'
import Lobby from './Lobby'

class App extends Component {
  state = {
    rooms: [],
    hasUser: false,
    currentUserId: null,
    hasCompleteGame: false,
    playingAsBlackPlayer: false,
    currentGameId: null
  }
  changeToWaitingRoom = (state) => {
    this.setState({
      hasUser:true,
      currentUserId: state.id
    })
  }
  changeToGame = (state) => {
    this.setState({
      hasCompleteGame: true,
      currentUserId: state.userId,
      playingAsBlackPlayer: true,
      currentGameId: state.gameId
    })
  }
  goDirectlyToGame = (state) => {
    this.setState({
      hasCompleteGame: true,
      currentUserId: state.userId,
      currentGameId: state.gameId
    })
  }
  render() {
    return (
      <div className="App">
        <h1>ChessMaster</h1>
        <div className='room'>
          <Switch>
            <Route
              path='/waiting-room'
              component={WaitingRoom}
            />
            <Route
              path='/'
              exact
              render={() =>{ return this.state.hasUser ?
                (<Redirect push
                to='/lobby' />)
                 : (<Login changeToWaitingRoom={this.changeToWaitingRoom}
                 />)
               }}
            />
            {/* <Route
              path='/lobby'
              render={() => <Lobby appState={this.state} changeToGame={this.changeToGame} />}
            /> */}
            <Route
              path='/lobby'
              render={() =>{ return this.state.hasCompleteGame ?
                (<Redirect push
                to='/play' />)
                 : (<Lobby appState={this.state} changeToGame={this.changeToGame} goDirectlyToGame={this.goDirectlyToGame} />)
               }}
            />

            <Route
              path='/play/'
              render={() =>
                <Room appState={this.state} />
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
