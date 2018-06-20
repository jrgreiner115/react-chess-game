import React, { Component } from 'react';
import './App.css';
import Room from './Room.js'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login.js'
import WaitingRoom from './WaitingRoom'

class App extends Component {
  state = {
    rooms: [],
    hasUser: false
  }
  changeToWaitingRoom = () => {
    this.setState({
      hasUser:true
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          <p>login/out</p>
        </div>
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
            <Route
              path='/play'
              component={Room}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
