import React, { Component } from 'react';
import Adapter from './services/adapter';

class Login extends Component {
  state ={
    name: "",
    hasUser: false,
    id: null
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
    .then(json =>
      this.setState({
        id: json.id
      })).then(whatever => this.props.changeToWaitingRoom(this.state))
  }

  render() {
    console.log("STATE", this.state, "PROPS", this.props);
    return (
      <div>
        <h2>
          Welcome!
        </h2>
        <h3>Please enter your name to join or create a game.</h3>
        <form onSubmit={this.handleSubmit}>
          <div class="group">
            <input onChange={this.handleChange} type="text" name='name' value={this.state.name} />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <input className='btn' type='submit' value='submit' name='submit' />
        </form>
      </div>
    )
  }
}

export default Login
