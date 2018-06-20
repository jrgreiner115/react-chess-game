import React, { Component } from 'react';
import Adapter from './services/adapter';

class Lobby extends Component {
  state ={
    name: "",
    hasUser: false
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    Adapter.createUser(this.state)
    .then(json => this.props.changeToWaitingRoom())
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>
          Welcome!
        </h1>
        <h2>Please Enter your name to Join or Create a Room.</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" name='name' value={this.state.name} />
          <input type='submit' value='submit' name='submit' />
        </form>
      </div>
    )
  }
}

export default Lobby
