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

import getNewItem from './../utils/getNewItem.js';

function Game(props) {

  const [actualGamePageName, setActualGamePageName] = useState("Brief");
  const [player, setPlayer] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [lvlsList, setLvlsList] = useState([]);
  const [isPlayerDataLoaded, setPlayerDataLoaded] = useState(false);
  const [isNextLvlPopUp, setNextLvlPopUp] = useState(false);

  useEffect(() => {
    getPlayer();
    getTasksList();
    getItemsList();
    getLvlsList();
  }, []);

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
    let isLvlUp = false;
    while(player.exp > player.expNextLvl) {
      isLvlUp = true;
      player.lvl += 1;
      player.exp -= player.expNextLvl;
      player.expNextLvl = lvlsList[player.lvl];
    }

    const url  = 'http://localhost:5000/heros/update/' + player._id;
    axios.post(url, player)
      .then((player) => {
        setPlayer(player.data)
        isLvlUp && setNextLvlPopUp(true);
      })
      .catch(err => {
        console.log('Error: ' + err);
      });

  }

  function getTasksList() {
    const url  = 'http://localhost:5000/tasks/';
    axios.get(url)
      .then(tasks => {
        setTasksList(tasks.data[0].tasksList)
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  function getItemsList() {
    const url  = 'http://localhost:5000/items/';
    axios.get(url)
      .then(items => {
        setItemsList(items.data[0].itemsList)
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  function getLvlsList() {
    const url  = 'http://localhost:5000/lvls/';
    axios.get(url)
      .then(lvls => {
        setLvlsList(lvls.data[0].lvlsList)
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
                          getNewItem = {()=> getNewItem(itemsList, player.lvl)}
                          player={player}
                          updatePlayer={player => updatePlayer(player)}
                          calculateTask={() => calculateTask()}
                          time={time}
                          startTask = {(id, gold, exp) => startTask(id, gold, exp)}/>
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

  //MeetingRoom start
  const [time, setTime] = useState("00:00");
  const [meetingRoomAlert, setMeetingRoomAlert] = useState('');

  const isTaskFinished = React.useCallback(() => {
    if (player.task.isStarted) {
      const endTime = player.task.endTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      setTime(secondsToEnd);
      return endTime < currentTime
    }
    return true
  }, [player])

  const finishTask = React.useCallback(() => {
    if(player.task.isStarted && isTaskFinished()) {
      let newPlayer = player;
      newPlayer.task.isFinished = true;
      setMeetingRoomAlert('!!');
      updatePlayer(newPlayer)
    }
  }, [isTaskFinished, player])

  useEffect(() => {
    const interval = setInterval(() => {
      finishTask();
    }, 1000);
    return () => clearInterval(interval);
  }, [player, finishTask]);

  function startTask(id, gold, exp) {
    let date = new Date();
    date = new Date(date.getTime() + tasksList[id].time*1000).getTime();
    let newPlayer = player;

    newPlayer.task.isStarted = true;
    newPlayer.task.isFinished = false;
    newPlayer.task.isCalculated = false;
    newPlayer.task.endTime = date;
    newPlayer.task.taskDuration = tasksList[id].time;
    newPlayer.task.gold = [gold];
    newPlayer.task.exp = [exp];

    updatePlayer(newPlayer)
  }

  function calculateTask() {
    if(isTaskFinished()) {
      let newPlayer = player;
      newPlayer.task.isStarted = false;
      newPlayer.task.isCalculated = true;
      newPlayer.task.isTasksIdSelected = false;
      setMeetingRoomAlert('');
      Number.isInteger(newPlayer.task.gold[0]) ?
        newPlayer.gold = newPlayer.gold + newPlayer.task.gold[0] :
        newPlayer.gold = newPlayer.gold + 1;
      Number.isInteger(newPlayer.task.exp[0]) ?
        newPlayer.exp = newPlayer.exp + newPlayer.task.exp[0] :
        newPlayer.exp = newPlayer.exp + 1;
      if(newPlayer.task.item) {
        addEquipmentToBackpack(newPlayer.task.item);
      }
      updatePlayer(newPlayer)
    }
  }

  function addEquipmentToBackpack(equipment) {
    if(player.backpack.length < 10) {
      player.backpack.push(equipment);
    }
  }

  //MeetingRoom end


  return (
    isPlayerDataLoaded ?
      <div  className="popupContainer"
            onClick={() => setNextLvlPopUp(false)}>
        <div className="gameContainer">
          <div className="GameMenu">
            <GameMenu onClick={(name) => setActualGamePageName(name)}
                      onClickLogout={() => props.onClickLogout()}
                      meetingRoomAlert={meetingRoomAlert}/>
          </div>
          <div className="GamePage">
            <GameHeader player={player}/>
            {selectGamePage()}
          </div>
        </div>
        {isNextLvlPopUp && (
          <div className="popup">
            Gratulacje <br />
            Osiągnięto następny poziom! <br />
            Aktualny poziom: {player.lvl}
          </div>
        )}
      </div> :
      <div>
        loading page
      </div>

  )
}

export default Game;
