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
  const [hero, setHero] = useState({});
  const [tasksList, setTasksList] = useState([]);
  const [bribesList, setBribesList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [lvlsList, setLvlsList] = useState([]);
  const [isHeroDataLoaded, setHeroDataLoaded] = useState(false);
  const [isNextLvlPopUp, setNextLvlPopUp] = useState(false);
  const awsUrl = 'https://5cohdjbvl4.execute-api.us-east-1.amazonaws.com/dev/'

  useEffect(() => {
    const getHero = () => {
      const url  = awsUrl + 'heros/' + props.heroId;
      axios.get(url)
        .then(hero => {
          setHero(hero.data)
          setHeroDataLoaded(true)
          console.log("Hero data is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getTasksList = () => {
      const url  = awsUrl + 'tasks/';
      axios.get(url)
        .then(tasks => {
          setTasksList(tasks.data.tasksList)
          console.log("Tasks list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getBribesList = () => {
      const url  = awsUrl + 'bribes/';
      axios.get(url)
        .then(bribes => {
          setBribesList(bribes.data.bribesList)
          console.log("Bribes list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getItemsList = () => {
      const url  = awsUrl + 'items/';
      axios.get(url)
        .then(items => {
          setItemsList(items.data.itemsList)
          console.log("Items list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }
    const getLvlsList = () => {
      const url  = awsUrl + 'lvls/';
      axios.get(url)
        .then(lvls => {
          setLvlsList(lvls.data.lvlsList)
          console.log("Lvls list is loaded from db")
        })
        .catch(err => {
          console.log('Error: ' + err);
        });
    }

    getHero();
    getTasksList();
    getBribesList();
    getItemsList();
    getLvlsList();
  }, [props.heroId]);

  const updateHero = React.useCallback((hero) => {
    let isLvlUp = false;
    while(hero.exp > hero.expNextLvl) {
      isLvlUp = true;
      hero.lvl += 1;
      hero.exp -= hero.expNextLvl;
      hero.expNextLvl = lvlsList[hero.lvl];
      hero.prison.chance = hero.lvl * 5;
    }

    const url  = 'https://5cohdjbvl4.execute-api.us-east-1.amazonaws.com/dev/heros/' + props.heroId;
    axios.put(url, hero)
      .then((hero) => {
        setHero(hero.data)
        isLvlUp && setNextLvlPopUp(true);
        console.log("Hero data is uploaded to db")
      })
      .catch(err => {
        console.log('Error: ' + err);
      });

  }, [lvlsList])

  const selectGamePage = () => {
    if (actualGamePageName==="Hero") {
      return <Hero  hero = {hero}
                    updateHero = {(hero) => updateHero(hero)}/>
    } else if (actualGamePageName==="City" && !hero.prison.isPrisoned) {
      return <City  task={hero.task}
                    prisonChance = {hero.prison.chance}
                    calculateTask = {() => calculateTask()}
                    remainingTaskDuration = {remainingTaskDuration}
                    startTask = {(task, id) => startTask(task, id)}/>
    } else if (actualGamePageName==="Residence" && !hero.prison.isPrisoned) {
      return <Residence />
    } else if (actualGamePageName==="Bribes" && !hero.prison.isPrisoned) {
      return <Bribes  hero = {hero}
                      bribesList = {bribesList}
                      updateHero = {(hero) => updateHero(hero)}
                      remainingBribeDuration = {remainingBribeDuration}/>
    } else if (actualGamePageName==="Lab" && !hero.prison.isPrisoned) {
      return <Lab />
    } else if (actualGamePageName==="Warehouse" && !hero.prison.isPrisoned) {
      return <Warehouse />
    } else if (actualGamePageName==="Map" && !hero.prison.isPrisoned) {
      return <Map />
    } else if (actualGamePageName==="Socios") {
      return <Socios />
    } else if (actualGamePageName==="Cartel") {
      return <Cartel />
    } else if (actualGamePageName==="MailBox") {
      return <MailBox />
    } else if (actualGamePageName==="Shop" && !hero.prison.isPrisoned) {
      return <Shop />
    } else {
      return <Prison  payAndGetOutPrison = {() => payAndGetOutPrison()}
                      isEnoughGoldToLeftPrison = {isEnoughGoldToLeftPrison()}
                      remainingPrisonDuration = {remainingPrisonDuration}
                      prisonDuration = {hero.prison.duration}
                      costOfGettingOutOfPrison = {calculateCostOfGettingOutOfPrison()}/>
    }
  }

  //City start
  const [remainingTaskDuration, setRemainingTaskDuration] = useState("undefined");
  const [CityAlert, setCityAlert] = useState('');

  const isTaskTimeElapsed = React.useCallback(() => {
    if (isHeroDataLoaded && hero.task.isStarted) {
      const endTime = hero.task.endTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      setRemainingTaskDuration(secondsToEnd);
      return endTime < currentTime
    }
    return false
  }, [hero])

  const finishTask = React.useCallback(() => {
    if(hero.task.isStarted && !hero.task.isFinished) {
      console.log("Function finishTask")
      let newHero = hero;
      newHero.task.isFinished = true;
      setCityAlert('!!');
      updateHero(newHero)
    }
  }, [hero, updateHero])

  useEffect(() => {
    const interval = setInterval(() => {
      if(isHeroDataLoaded && isTaskTimeElapsed())
        finishTask();
      if(isHeroDataLoaded && isPrisonTimeElapsed())
        terminationOfPrisonSentence();
      if(isHeroDataLoaded && isBribeTimeElapsed())
        finishBribe();
    }, 1000);
    return () => clearInterval(interval);
  }, [hero, finishTask, isTaskTimeElapsed, isHeroDataLoaded]);

  const startTask = (task, id) => {
    console.log("Function startTask");
    let date = new Date();
    let taskEndTime = new Date(date.getTime() + task.taskDuration[id]*1000).getTime();
    let newHero = hero;

    newHero.task.isStarted = true;
    newHero.task.isFinished = false;
    newHero.task.isCalculated = false;
    newHero.task.endTime = taskEndTime;
    newHero.task.taskDuration = task.taskDuration[id];
    newHero.task.name = task.name[id];
    newHero.task.description = task.description[id];
    newHero.task.imgUrl = task.imgUrl[id];
    newHero.task.gold = task.gold[id];
    newHero.task.exp = task.exp[id];
    updateHero(newHero);
  }

  const calculateTask = () => {
    if(isTaskTimeElapsed()) {
      console.log("Function calculateTask")
      setCityAlert('');
      let newHero = hero;

      if (getRandomInt(1, 100) < hero.prison.chance) {
        let date = new Date();
        newHero.prison.isPrisoned = true
        newHero.prison.exitPrisonTime = new Date(date.getTime() + hero.prison.duration*1000).getTime()
      }

      newHero.task.isStarted = false;
      newHero.task.isFinished = false;
      newHero.task.isCalculated = true;

      if(!newHero.prison.isPrisoned) {
        Number.isInteger(newHero.task.gold) ?
          newHero.gold = newHero.gold + newHero.task.gold :
          newHero.gold = newHero.gold + 1;
        Number.isInteger(newHero.task.exp) ?
          newHero.exp = newHero.exp + newHero.task.exp :
          newHero.exp = newHero.exp + 1;
        if(newHero.task.item) {
          addEquipmentToBackpack(newHero.task.item);
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
      let lvl = newHero.lvl + 1;
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
        newHero.task.item = getNewItem(itemsList, lvl);
      } else {
        newHero.task.item = {};
      }
      newHero.task.gold = newGold;
      newHero.task.exp = newExp;
      newHero.task.name = newName;
      newHero.task.description = newDescription;
      newHero.task.taskDuration = newTaskDuration;
      newHero.task.imgUrl = newImgUrl;
      setRemainingTaskDuration("undefined")
      updateHero(newHero);
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
    if(hero.backpack.length < 10) {
      hero.backpack.push(equipment);
    }
  }
  //City end

  //Prison start
  const [remainingPrisonDuration, setRemainingPrisonDuration] = useState("undefined");

  const calculateCostOfGettingOutOfPrison = () => {
    return hero.lvl * 1
  }

  const isEnoughGoldToLeftPrison = () => {
    return hero.gold >= calculateCostOfGettingOutOfPrison()
  }

  const isPrisonTimeElapsed = React.useCallback(() => {
    if (hero.prison.isPrisoned) {
      const endTime = hero.prison.exitPrisonTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      setRemainingPrisonDuration(secondsToEnd);
      return endTime < currentTime
    }
    return false
  }, [hero])

  const terminationOfPrisonSentence = React.useCallback(() => {
    if(hero.prison.isPrisoned) {
      console.log("Function terminationOfPrisonSentence")
      let newHero = hero
      newHero.prison.isPrisoned = false
      setRemainingPrisonDuration("undefined")
      updateHero(newHero)
    }
  }, [hero, updateHero])

  const payAndGetOutPrison = () => {
    const newHero = hero
    const costOfGettingOutOfPrison = calculateCostOfGettingOutOfPrison()
    newHero.gold = newHero.gold - costOfGettingOutOfPrison
    newHero.prison.isPrisoned = false
    newHero.prison.exitPrisonTime = 1596743927075
    setRemainingPrisonDuration("undefined")
    updateHero(newHero)
  }
  //Prison end

  //Birbe start
  const [remainingBribeDuration, setRemainingBribeDuration] = useState("undefined");

  const isBribeTimeElapsed = React.useCallback(() => {
    if (hero.bribe.isPayed) {
      const endTime = hero.bribe.endTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      setRemainingBribeDuration(secondsToEnd);
      return endTime < currentTime
    }
    return false
  }, [hero])

  const finishBribe = React.useCallback(() => {
    if(hero.bribe.isPayed) {
      console.log("Function finishBribe")
      let newHero = hero
      newHero.bribe.isPayed = false
      newHero.prison.chance += newHero.bribe.chanceReduction
      setRemainingBribeDuration("undefined")
      updateHero(newHero)
    }
  }, [hero, updateHero])
  //Bribe end

  return (
    isHeroDataLoaded ?
      <div  className="popupContainer"
            onClick={() => setNextLvlPopUp(false)}>
        <div className="gameContainer">
          <div className="GameMenu">
            <GameMenu onClick={name => setActualGamePageName(name)}
                      onClickLogout={() => props.onClickLogout()}
                      CityAlert={CityAlert}/>
          </div>
          <div className="GamePage">
            <GameHeader hero={hero}/>
            {selectGamePage()}
          </div>
        </div>
        {isNextLvlPopUp && (
          <div className="popup">
            Gratulacje <br />
            Osiągnięto następny poziom! <br />
            Aktualny poziom: {hero.lvl}
          </div>
        )}
      </div> :
      <div>
        loading page
      </div>

  )
}

export default Game;
