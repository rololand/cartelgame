import React from 'react';
import axios from 'axios';

class Brief extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        username: '',
        class: '',
        stats: {
          strength: 0,
          dexterity: 0,
          stamina: 0,
          intelligence: 0,
          luck: 0,
          armor: 0
        }
      }
    }
  }

  getPlayer() {
    const url  = 'http://localhost:5000/users/' + this.props.playerId;
    axios.get(url)
      .then(player => {
        this.setState({
          player: {
            username: player.data.username,
            class: player.data.class,
            stats: {
              strength: player.data.stats.strength,
              dexterity: player.data.stats.dexterity,
              stamina: player.data.stats.stamina,
              intelligence: player.data.stats.intelligence,
              luck: player.data.stats.luck,
              armor: player.data.stats.armor
            }
          }
        })
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  render() {
    this.getPlayer();
    return (
      <div>
        Brief <br />
        Nick: {this.state.player.username}<br />
        Klasa: {this.state.player.class}<br />
        Siła: {this.state.player.stats.strength}<br />
        Zręczność: {this.state.player.stats.dexterity}<br />
        Wytrzymałość: {this.state.player.stats.stamina}<br />
        Inteligencja: {this.state.player.stats.intelligence}<br />
        Szczęście: {this.state.player.stats.luck}<br />
        Pancerz: {this.state.player.stats.armor}<br />
      </div>
    )
  }
}

export default Brief;
