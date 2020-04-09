import React from 'react';
import logo from './logo.svg';
import './App.css';
import Logging from './logging/Logging.js'
import Game from './game/Game.js'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {isUserLogged: false}
  }

  handleLogging() {
    const isLogged = true;
    this.setState({
      isUserLogged: isLogged
    })
  }

  render() {

    return (
      <div className="App">
        {this.state.isUserLogged ? <Game /> : <Logging handleLogging={this.handleLogging.bind(this)} />}
      </div>
    )
  }

}

export default App;
