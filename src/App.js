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
        <Room />

      </div>
    );
  }
}

export default App;
