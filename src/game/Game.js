import React from 'react';
import axios from 'axios';
import './Game.css';

import GameMenu from './GameMenu.js';

import Brief from './Brief.js';
import MeetingRoom from './MeetingRoom.js';
import OpenSpace from './OpenSpace.js';
import Assets from './Assets.js';
import CoffeeBreak from './CoffeeBreak.js';
import ItSupport from './ItSupport.js';
import Market from './Market.js';
import Office from './Office.js';
import Team from './Team.js';
import MailBox from './MailBox.js';
import Evaluation from './Evaluation.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        username: '',
        class: '',
        gold: 0,
        stats: {
          strength: 0,
          dexterity: 0,
          stamina: 0,
          intelligence: 0,
          luck: 0,
          armor: 0
        }
      },
      actualGamePageName: "Brief",
    };
  }

  componentDidMount() {
    this.getPlayer();
  }

  getPlayer() {
    const url  = 'http://localhost:5000/heros/' + this.props.playerId;
    axios.get(url)
      .then(player => {
        this.setState({
          player: player.data
        })
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  updatePlayer(player) {
    const url  = 'http://localhost:5000/heros/update/' + player._id;
    axios.post(url, player)
      .then((player) => {
        this.setState({
          player: player.data
        })
      })
      .catch(err => {
        console.log('Error: ' + err);
      });

  }

  handleGameMenuClick(name) {
    this.setState({
      actualGamePageName: name
    })
  }

  selectGamePage() {
    if (this.state.actualGamePageName==="Brief") {
      return <Brief player={this.state.player}
                    updatePlayer={this.updatePlayer.bind(this)}/>
    } else if (this.state.actualGamePageName==="MeetingRoom") {
      return <MeetingRoom />
    } else if (this.state.actualGamePageName==="OpenSpace") {
      return <OpenSpace />
    } else if (this.state.actualGamePageName==="ItSupport") {
      return <ItSupport />
    } else if (this.state.actualGamePageName==="CoffeeBreak") {
      return <CoffeeBreak />
    } else if (this.state.actualGamePageName==="Assets") {
      return <Assets />
    } else if (this.state.actualGamePageName==="Market") {
      return <Market />
    } else if (this.state.actualGamePageName==="Office") {
      return <Office />
    } else if (this.state.actualGamePageName==="Team") {
      return <Team />
    } else if (this.state.actualGamePageName==="MailBox") {
      return <MailBox />
    } else if (this.state.actualGamePageName==="Evaluation") {
      return <Evaluation />
    }
  }

  render() {
    return (
      <div className="gameContainer">
        <div className="GameMenu">
          <GameMenu onClick={this.handleGameMenuClick.bind(this)} onClickLogout={this.props.onClickLogout.bind(this)}/>
        </div>
        <div className="GamePage">
          {this.selectGamePage()}
        </div>
      </div>
    )
  }
}

export default Game;
