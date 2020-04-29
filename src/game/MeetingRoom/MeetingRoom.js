import React, {useState, useEffect } from 'react';
import TasksContainer from './TasksContainer.js'

function MeetingRoom(props) {
  const [time, setTime] = useState("00:00");

  const isTaskFinished = React.useCallback(() => {
    if (props.player.task.isStarted) {
      const endTime = props.player.task.endTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      counter(secondsToEnd);
      return endTime < currentTime
    }
    return true
  }, [props.player.task.endTime, props.player.task.isStarted])

  const finishTask = React.useCallback(() => {
    if(isTaskFinished()) {
      let newPlayer = props.player;
      newPlayer.task.isFinished = true;
      props.updatePlayer(newPlayer)
    }
  }, [isTaskFinished, props])

  useEffect(() => {
    const interval = setInterval(() => {
      finishTask();
    }, 1000);
    return () => clearInterval(interval);
  }, [props.player.task.isStarted, props.player.task.isStarted, finishTask]);

  function counter(time) {
    let m = Math.floor(time/60);
    let s = Math.round(time%60);
    let min = '';
    let sek = '';
    m < 0 && (m = 0);
    s < 0 && (s = 0);
    m < 10 ? min = '0'+m : min = m;
    s < 10 ? sek = '0'+s : sek = s;
    setTime(min + ":" + sek);
  }

  function startTask(id, gold, exp) {
    let date = new Date();
    date = new Date(date.getTime() + props.tasksList[id].time*1000).getTime();
    let newPlayer = props.player;

    newPlayer.task.isStarted = true;
    newPlayer.task.isFinished = false;
    newPlayer.task.isCalculated = false;
    newPlayer.task.endTime = date;
    newPlayer.task.gold = [gold];
    newPlayer.task.exp = [exp];

    props.updatePlayer(newPlayer)
  }

  function calculateTask() {
    console.log("calculating")
    if(isTaskFinished()) {
      let newPlayer = props.player;
      newPlayer.task.isStarted = false;
      newPlayer.task.isCalculated = true;
      newPlayer.task.isTasksIdSelected = false;
      Number.isInteger(newPlayer.task.gold[0]) ?
        newPlayer.gold = newPlayer.gold + newPlayer.task.gold[0] :
        newPlayer.gold = newPlayer.gold + 1;
      Number.isInteger(newPlayer.task.exp[0]) ?
        newPlayer.exp = newPlayer.exp + newPlayer.task.exp[0] :
        newPlayer.exp = newPlayer.exp + 1;
      props.updatePlayer(newPlayer)
    }
  }

  function pageSelector() {
    if(props.player.task.isStarted) {
      if(props.player.task.isFinished)
        return <div><button onClick={() => calculateTask()}>Calculate Task</button></div>
      else
        return <div>{time}</div>
    } else {
      if (!props.player.task.isTasksIdSelected)
        selectTasksId();
      return <TasksContainer startTask={startTask.bind(this)}
                            tasksList={props.tasksList}
                            selectedTasksList={props.player.task.selectedTasksList}
                            gold={props.player.task.gold}
                            exp={props.player.task.exp}/>
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function selectTasksId() {
    let newPlayer = props.player;

    let id1 = getRandomInt(0, props.tasksList.length);
    let id2 = getRandomInt(0, props.tasksList.length);
    let id3 = getRandomInt(0, props.tasksList.length);
    while(id2 === id1) {
      id2 = getRandomInt(0, props.tasksList.length);
    }
    while(id3 === id1 || id3 === id2) {
      id3 = getRandomInt(0, props.tasksList.length);
    }
    let time = [props.tasksList[id1].time, props.tasksList[id2].time, props.tasksList[id3].time];
    let newGold = [props.tasksList[id1].gold, props.tasksList[id2].gold, props.tasksList[id3].gold];
    let newExp = [props.tasksList[id1].exp, props.tasksList[id2].exp, props.tasksList[id3].exp];
    let random = 0;
    let lvl = newPlayer.lvl + 1;
    let idList = [0, 1, 2];
    for(var i of idList) {
      random = getRandomInt(1, time[i]-1);
      newGold[i] = newGold[i] * lvl * random;
      newExp[i] = newExp[i] * lvl * (time[i] - random);
    }
    newPlayer.task.isTasksIdSelected = true;
    newPlayer.task.selectedTasksList = [id1, id2, id3];
    newPlayer.task.gold = newGold;
    newPlayer.task.exp = newExp;
    props.updatePlayer(newPlayer)
  }

  return (
    <div>
      {pageSelector()}
    </div>
  )
}

export default MeetingRoom;
