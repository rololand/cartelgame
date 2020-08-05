import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css';

import GameMenu from './GameMenu.js';
import GameHeader from './GameHeader.js';

import Hero from './Hero/Hero.js';
import City from './City/City.js';
import Residence from './Residence/Residence.js';
import Warehouse from './Warehouse/Warehouse.js';
import Lab from './Lab/Lab.js';
import Bribes from './Bribes/Bribes.js';
import Map from './Map/Map.js';
import Socios from './Socios/Socios.js';
import Cartel from './Cartel/Cartel.js';
import MailBox from './MailBox/MailBox.js';
import Shop from './Shop/Shop.js';
import Prison from './Prison/Prison.js';

import getNewItem from './../utils/getNewItem.js';
import getRandomInt from './../utils/getRandomInt.js'

const Game = (props) => {

  const [actualGamePageName, setActualGamePageName] = useState("Hero");
  const [player, setPlayer] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [lvlsList, setLvlsList] = useState([]);
  const [isPlayerDataLoaded, setPlayerDataLoaded] = useState(false);
  const [isNextLvlPopUp, setNextLvlPopUp] = useState(false);

  useEffect(() => {
    const getPlayer = () => {
      const url  = 'http://localhost:5000/heros/' + props.playerId;
      axios.get(url)
        .then(player => {
          setPlayer(player.data);
          setPlayerDataLoaded(true);
          console.log("Player data is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getTasksList = () => {
      const url  = 'http://localhost:5000/tasks/';
      axios.get(url)
        .then(tasks => {
          setTasksList(tasks.data[0].tasksList)
          console.log("Task list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getItemsList = () => {
      const url  = 'http://localhost:5000/items/';
      axios.get(url)
        .then(items => {
          setItemsList(items.data[0].itemsList)
          console.log("Item list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getLvlsList = () => {
      const url  = 'http://localhost:5000/lvls/';
      axios.get(url)
        .then(lvls => {
          setLvlsList(lvls.data[0].lvlsList)
          console.log("Lvls list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }

    getPlayer();
    getTasksList();
    getItemsList();
    getLvlsList();
  }, [props.playerId]);

  const updatePlayer = React.useCallback((player) => {
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
        console.log("Player data is uploaded to db")
      })
      .catch(err => {
        console.log('Error: ' + err);
      });

  }, [lvlsList])

  const selectGamePage = () => {
    if (actualGamePageName==="Hero") {
      return <Hero  player={player}
                    updatePlayer={(player) => updatePlayer(player)}/>
    } else if (actualGamePageName==="City" && !player.prison.isPrisoned) {
      return <City  task={player.task}
                    prisonChance = {player.prison.chance}
                    calculateTask={() => calculateTask()}
                    remainingTaskDuration={remainingTaskDuration}
                    startTask = {(task, id) => startTask(task, id)}/>
    } else if (actualGamePageName==="Residence") {
      return <Residence />
    } else if (actualGamePageName==="Bribes") {
      return <Bribes />
    } else if (actualGamePageName==="Lab") {
      return <Lab />
    } else if (actualGamePageName==="Warehouse") {
      return <Warehouse />
    } else if (actualGamePageName==="Map") {
      return <Map />
    } else if (actualGamePageName==="Socios") {
      return <Socios />
    } else if (actualGamePageName==="Cartel") {
      return <Cartel />
    } else if (actualGamePageName==="MailBox") {
      return <MailBox />
    } else if (actualGamePageName==="Shop") {
      return <Shop />
    } else {
      return <Prison  releaseFromPrison={() => releaseFromPrison()}
                      isEnoughGoldToLeftPrison={isEnoughGoldToLeftPrison()}
                      remainingPrisonDuration={remainingPrisonDuration}
                      prisonDuration={player.prison.duration}
                      costOfGettingOutOfPrison={calculateCostOfGettingOutOfPrison()}/>
    }
  }

  //City start
  const [remainingTaskDuration, setRemainingTaskDuration] = useState("00:00");
  const [CityAlert, setCityAlert] = useState('');

  const isTaskTimeElapsed = React.useCallback(() => {
    if (player.task.isStarted) {
      const endTime = player.task.endTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      setRemainingTaskDuration(secondsToEnd);
      return endTime < currentTime
    }
    return false
  }, [player])

  const finishTask = React.useCallback(() => {
    if(player.task.isStarted && !player.task.isFinished) {
      console.log("Function finishTask")
      let newPlayer = player;
      newPlayer.task.isFinished = true;
      setCityAlert('!!');
      updatePlayer(newPlayer)
    }
  }, [player, updatePlayer])

  useEffect(() => {
    const interval = setInterval(() => {
      if(isTaskTimeElapsed())
        finishTask();
      if(isPrisonTimeElapsed())
        leavePrison();
    }, 1000);
    return () => clearInterval(interval);
  }, [player, finishTask, isTaskTimeElapsed]);

  const startTask = (task, id) => {
    console.log("Function startTask");
    let date = new Date();
    let taskEndTime = new Date(date.getTime() + task.taskDuration[id]*1000).getTime();
    let newPlayer = player;

    newPlayer.task.isStarted = true;
    newPlayer.task.isFinished = false;
    newPlayer.task.isCalculated = false;
    newPlayer.task.endTime = taskEndTime;
    newPlayer.task.taskDuration = task.taskDuration[id];
    newPlayer.task.name = task.name[id];
    newPlayer.task.description = task.description[id];
    newPlayer.task.imgUrl = task.imgUrl[id];
    newPlayer.task.gold = task.gold[id];
    newPlayer.task.exp = task.exp[id];
    updatePlayer(newPlayer);
  }

  const calculateTask = () => {
    if(isTaskTimeElapsed()) {
      console.log("Function calculateTask")
      setCityAlert('');
      let newPlayer = player;

      if (getRandomInt(1, 100) < player.prison.chance) {
        let date = new Date();
        newPlayer.prison.isPrisoned = true
        newPlayer.prison.exitPrisonTime = new Date(date.getTime() + player.prison.duration*1000).getTime()
      }

      newPlayer.task.isStarted = false;
      newPlayer.task.isFinished = false;
      newPlayer.task.isCalculated = true;

      if(!newPlayer.prison.isPrisoned) {
        Number.isInteger(newPlayer.task.gold) ?
          newPlayer.gold = newPlayer.gold + newPlayer.task.gold :
          newPlayer.gold = newPlayer.gold + 1;
        Number.isInteger(newPlayer.task.exp) ?
          newPlayer.exp = newPlayer.exp + newPlayer.task.exp :
          newPlayer.exp = newPlayer.exp + 1;
        if(newPlayer.task.item) {
          addEquipmentToBackpack(newPlayer.task.item);
        }
      }

      //draw new tasks
      const drawedTaskIds = drawOfThreeTaskIds()
      let newGold = []
      let newExp = []
      let newName = []
      let newDescription = []
      let newImgUrl = []
      let newTaskDuration = []
      let random = 0;
      let lvl = newPlayer.lvl + 1;
      let idList = [0, 1, 2];
      for(var i of idList) {
        newName[i] = tasksList[drawedTaskIds[i]].name
        newDescription[i] = tasksList[drawedTaskIds[i]].description
        newImgUrl[i] = tasksList[drawedTaskIds[i]].imgUrl
        newTaskDuration[i] = tasksList[drawedTaskIds[i]].time
        random = getRandomInt(1, newTaskDuration[i]/2);
        newGold[i] = Math.floor(tasksList[drawedTaskIds[i]].gold * lvl * random / 30)
        newExp[i] = Math.floor(tasksList[drawedTaskIds[i]].exp * lvl * (newTaskDuration[i] - random) / 30)
      }
      if(getRandomInt(1, 100) < 90) {
        newPlayer.task.item = getNewItem(itemsList, lvl);
      } else {
        newPlayer.task.item = {};
      }
      newPlayer.task.gold = newGold;
      newPlayer.task.exp = newExp;
      newPlayer.task.name = newName;
      newPlayer.task.description = newDescription;
      newPlayer.task.taskDuration = newTaskDuration;
      newPlayer.task.imgUrl = newImgUrl;
      updatePlayer(newPlayer);
    }
  }

  const drawOfThreeTaskIds = () => {
    let id1 = getRandomInt(0, tasksList.length);
    let id2 = getRandomInt(0, tasksList.length);
    let id3 = getRandomInt(0, tasksList.length);
    while(id2 === id1) {
      id2 = getRandomInt(0, tasksList.length);
    }
    while(id3 === id1 || id3 === id2) {
      id3 = getRandomInt(0, tasksList.length);
    }
    return [id1, id2, id3]
  }

  const addEquipmentToBackpack = (equipment) => {
    if(player.backpack.length < 10) {
      player.backpack.push(equipment);
    }
  }
  //City end

  //Prison start
  const [remainingPrisonDuration, setRemainingPrisonDuration] = useState("00:00");

  const releaseFromPrison = () => {
    const newPlayer = player
    const costOfGettingOutOfPrison = calculateCostOfGettingOutOfPrison()
    newPlayer.gold = newPlayer.gold - costOfGettingOutOfPrison
    newPlayer.prison.isPrisoned = false
    updatePlayer(newPlayer)
  }

  const calculateCostOfGettingOutOfPrison = () => {
    return player.lvl * 100
  }

  const isEnoughGoldToLeftPrison = () => {
    return player.gold >= calculateCostOfGettingOutOfPrison()
  }

  const isPrisonTimeElapsed = React.useCallback(() => {
    if (player.prison.isPrisoned) {
      const endTime = player.prison.exitPrisonTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      console.log("endTime: " + endTime)
      console.log("currentTime: " + currentTime)
      console.log("secondsToEnd: " + secondsToEnd)
      setRemainingPrisonDuration(secondsToEnd);
      return endTime < currentTime
    }
    return false
  }, [player])

  const leavePrison = React.useCallback(() => {
    if(player.prison.isPrisoned) {
      console.log("Function leavePrison")
      let newPlayer = player
      newPlayer.prison.isPrisoned = false
      updatePlayer(newPlayer)
    }
  }, [player, updatePlayer])
  //Prison end

  return (
    isPlayerDataLoaded ?
      <div  className="popupContainer"
            onClick={() => setNextLvlPopUp(false)}>
        <div className="gameContainer">
          <div className="GameMenu">
            <GameMenu onClick={name => setActualGamePageName(name)}
                      onClickLogout={() => props.onClickLogout()}
                      CityAlert={CityAlert}/>
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
