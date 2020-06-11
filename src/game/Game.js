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

import getNewItem from './../utils/getNewItem.js';

const Game = (props) => {

  const [actualGamePageName, setActualGamePageName] = useState("Hero");
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

  const getPlayer = () => {
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

  const updatePlayer = (player) => {
    console.log("updating");
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

  const getTasksList = () => {
    const url  = 'http://localhost:5000/tasks/';
    axios.get(url)
      .then(tasks => {
        setTasksList(tasks.data[0].tasksList)
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
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  }

  const selectGamePage = () => {
    if (actualGamePageName==="Hero") {
      return <Hero  player={player}
                    updatePlayer={(player) => updatePlayer(player)}/>
    } else if (actualGamePageName==="City") {
      return <City  tasksList={tasksList}
                    getNewItem = {()=> getNewItem(itemsList, player.lvl)}
                    player={player}
                    updatePlayer={player => updatePlayer(player)}
                    calculateTask={() => calculateTask()}
                    time={time}
                    startTask = {(id, gold, exp) => startTask(id, gold, exp)}/>
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
    }
  }

  //City start
  const [time, setTime] = useState("00:00");
  const [CityAlert, setCityAlert] = useState('');

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
    if(player.task.isStarted && !player.task.isFinished) {
      let newPlayer = player;
      newPlayer.task.isFinished = true;
      setCityAlert('!!');
      console.log("finishTask");
      updatePlayer(newPlayer)
    }
  }, [player])

  useEffect(() => {
    const interval = setInterval(() => {
      if(isTaskFinished())
        finishTask();
    }, 1000);
    return () => clearInterval(interval);
  }, [player, finishTask, isTaskFinished]);

  const startTask = (id, gold, exp) => {
    let date = new Date();
    date = new Date(date.getTime() + tasksList[id].time*1000).getTime();
    let newPlayer = player;

    newPlayer.task.isStarted = true;
    newPlayer.task.isFinished = false;
    newPlayer.task.isCalculated = false;
    newPlayer.task.endTime = date;
    newPlayer.task.taskDuration = tasksList[id].time;
    newPlayer.task.name = tasksList[id].name;
    newPlayer.task.description = tasksList[id].description;
    newPlayer.task.imgUrl = tasksList[id].imgUrl;
    newPlayer.task.gold = [gold];
    newPlayer.task.exp = [exp];
    newPlayer.task.taskId = id;
    console.log("startTask");
    updatePlayer(newPlayer);
  }

  const calculateTask = () => {
    if(isTaskFinished()) {
      let newPlayer = player;
      newPlayer.task.isStarted = false;
      newPlayer.task.isCalculated = true;
      newPlayer.task.isTasksIdSelected = false;
      setCityAlert('');
      Number.isInteger(newPlayer.task.gold[0]) ?
        newPlayer.gold = newPlayer.gold + newPlayer.task.gold[0] :
        newPlayer.gold = newPlayer.gold + 1;
      Number.isInteger(newPlayer.task.exp[0]) ?
        newPlayer.exp = newPlayer.exp + newPlayer.task.exp[0] :
        newPlayer.exp = newPlayer.exp + 1;
      if(newPlayer.task.item) {
        addEquipmentToBackpack(newPlayer.task.item);
      }
      console.log("calculateTask")
      updatePlayer(newPlayer)
    }
  }

  const addEquipmentToBackpack = (equipment) => {
    if(player.backpack.length < 10) {
      player.backpack.push(equipment);
    }
  }

  //City end


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
