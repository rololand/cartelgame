import React from 'react';
import SelectTaskContainer from './SelectTaskContainer.js'
import ExecuteTaskContainer from './ExecuteTaskContainer.js'
import FinishedTaskContainer from './FinishedTaskContainer.js'
import getRandomInt from './../../utils/getRandomInt.js'

const City = (props) => {

  const pageSelector = () => {
    if(props.player.task.isStarted) {
      if(props.player.task.isFinished)
        return (
          <FinishedTaskContainer  task={props.player.task}
                                  calculateTask={props.calculateTask}/>
        )
      else
        return (
          Number.isInteger(props.time) && (
            <ExecuteTaskContainer time={props.time}
                                  task={props.player.task}/>
          )
        )
    } else {
      if (!props.player.task.isTasksIdSelected)
        selectTasks();
      return <SelectTaskContainer   startTask={props.startTask.bind(this)}
                                    tasksList={props.tasksList}
                                    task={props.player.task}/>
    }
  }

  const selectTasks = () => {
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
      newGold[i] = Math.floor(newGold[i] * lvl * random / 30);
      newExp[i] = Math.floor(newExp[i] * lvl * (time[i] - random) / 30);
    }

    if(getRandomInt(1, 100) < 90) {
      newPlayer.task.item = props.getNewItem();
    } else {
      newPlayer.task.item = {};
    }
    newPlayer.task.isTasksIdSelected = true;
    newPlayer.task.selectedTasksList = [id1, id2, id3];
    newPlayer.task.gold = newGold;
    newPlayer.task.exp = newExp;
    props.updatePlayer(newPlayer);
  }

  return (
    <div>
      {pageSelector()}
    </div>
  )
}

export default City;
