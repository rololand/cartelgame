import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';

import GameMenu from './GameMenu.js';
import GameHeader from './GameHeader.js';

import Brief from './Brief/Brief.js';
import MeetingRoom from './MeetingRoom/MeetingRoom.js';
import OpenSpace from './OpenSpace.js';
import Assets from './Assets.js';
import CoffeeBreak from './CoffeeBreak.js';
import ItSupport from './ItSupport.js';
import Market from './Market.js';
import Office from './Office.js';
import Team from './Team.js';
import MailBox from './MailBox.js';
import Evaluation from './Evaluation.js';

function Game(props) {

  const [actualGamePageName, setActualGamePageName] = useState("Brief");
  const [player, setPlayer] = useState({});
  const [tasksList, setTaskList] = useState([]);
  const [isPlayerDataLoaded, setPlayerDataLoaded] = useState(false);

  useEffect(() => {
    getPlayer();
    getTasksList();
  });

  function getPlayer() {
    const url  = 'http://localhost:5000/heros/' + props.playerId;
    axios.get(url)
      .then(player => {
        setPlayer(player.data);
        setPlayerDataLoaded(true);
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  function updatePlayer(player) {
    const url  = 'http://localhost:5000/heros/update/' + player._id;
    axios.post(url, player)
      .then((player) => {
        setPlayer(player.data)
      })
      .catch(err => {
        console.log('Error: ' + err);
      });

  }

  function getTasksList() {
    const url  = 'http://localhost:5000/tasks/';
    axios.get(url)
      .then(tasks => {
        setTaskList(tasks.data[0].tasksList)
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  function selectGamePage() {
    if (actualGamePageName==="Brief") {
      return <Brief player={player}
                    updatePlayer={(player) => updatePlayer(player)}/>
    } else if (actualGamePageName==="MeetingRoom") {
      return <MeetingRoom tasksList={tasksList}
                          player={player}
                          updatePlayer={(player) => updatePlayer(player)}/>
    } else if (actualGamePageName==="OpenSpace") {
      return <OpenSpace />
    } else if (actualGamePageName==="ItSupport") {
      return <ItSupport />
    } else if (actualGamePageName==="CoffeeBreak") {
      return <CoffeeBreak />
    } else if (actualGamePageName==="Assets") {
      return <Assets />
    } else if (actualGamePageName==="Market") {
      return <Market />
    } else if (actualGamePageName==="Office") {
      return <Office />
    } else if (actualGamePageName==="Team") {
      return <Team />
    } else if (actualGamePageName==="MailBox") {
      return <MailBox />
    } else if (actualGamePageName==="Evaluation") {
      return <Evaluation />
    }
  }


  return (
    isPlayerDataLoaded ?
      <div className="gameContainer">
        <div className="GameMenu">
          <GameMenu onClick={(name) => setActualGamePageName(name)} onClickLogout={() => props.onClickLogout()}/>
        </div>
        <div className="GamePage">
          <GameHeader player={player}/>
          {selectGamePage()}
        </div>
      </div> :
      <div>
        loading page
      </div>

  )
}

export default Game;
