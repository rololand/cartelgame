import React from 'react';
import axios from 'axios';
import './App.css';
import Logging from './logging/Logging.js'
import Game from './game/Game.js'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isUserLogged: false,
      login: "admin",
      password: "admin"
    }
  }

  handleLoggingOnClickButton() {
    const url  = 'http://localhost:5000/users/findByUsername/' + this.state.login;
    axios.get(url)
      .then(user => {
        if(user.data.password == this.state.password) {

          this.setState({
            isUserLogged: true
          })
        }
      })
      .catch(err => console.log('Error: ' + err));
  }

  handleChangeLogin(event) {
    const input = event.target.value;
    this.setState({
      login: input
    })
  }

  handleChangePassword(event) {
    const input = event.target.value;
    this.setState({
      password: input
    })
  }

  render() {

    return (
      <div className="App">
        {this.state.isUserLogged ?
          <Game /> :
          <Logging  handleLoggingOnClickButton={this.handleLoggingOnClickButton.bind(this)}
                    handleChangeLogin={this.handleChangeLogin.bind(this)}
                    handleChangePassword={this.handleChangePassword.bind(this)}
                    login={this.state.login}
                    password={this.state.password}
          />
        }
      </div>
    )
  }

}

export default App;
