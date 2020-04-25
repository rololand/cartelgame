import React, {useState, useEffect } from 'react';

function MeetingRoom(props) {
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      finishTask();
    }, 1000);
    return () => clearInterval(interval);
  }, [props.player.task.isStarted, finishTask]);

  function isTaskFinished() {
    if (props.player.task.isStarted) {
      const endTime = props.player.task.endTime;
      const currentTime = new Date().getTime();
      const secondsToEnd = Math.round((endTime - currentTime)/1000);
      counter(secondsToEnd);
      return endTime < currentTime
    }
    return true
  }

  function counter(time) {
    let m = Math.floor(time/60);
    let s = Math.round(time%60);
    let min = '';
    let sek = '';
    m < 0 ? m = 0 : m = m;
    s < 0 ? s = 0 : s =s;
    m < 10 ? min = '0'+m : min = m;
    s < 10 ? sek = '0'+s : sek = s;
    setTime(min + ":" + sek);
  }

  function startTask(id) {
    let date = new Date();
    date = new Date(date.getTime() + props.tasksList[id].time*1000).getTime();
    let newTask = {
      isStarted: true,
      isFinished: false,
      isCalculated: false,
      endTime: date,
      taskId: id,
      gold: props.tasksList[id].gold,
      exp: props.tasksList[id].exp,
    };
    let newPlayer = props.player;
    newPlayer.task = newTask;
    props.updatePlayer(newPlayer)
  }

  function finishTask() {
    if(isTaskFinished()) {
      let newPlayer = props.player;
      newPlayer.task.isFinished = true;
      props.updatePlayer(newPlayer)
    }
  }

  function calculateTask() {
    if(isTaskFinished()) {
      let newPlayer = props.player;
      let newTask = {
        isStarted: false,
        isFinished: true,
        isCalculated: true,
        endTime: '',
        taskId: 0,
        gold: 0,
        exp: 0,
      };
      newPlayer.gold = newPlayer.gold + newPlayer.task.gold;
      newPlayer.exp = newPlayer.exp + newPlayer.task.exp;
      newPlayer.task = newTask;
      props.updatePlayer(newPlayer)
    }
  }

  function pageSelector() {
    if(props.player.task.isStarted) {
      if(props.player.task.isFinished)
        return <div><button onClick={() => calculateTask(0)}>Calculate Task</button></div>
      else
        return <div>{time}</div>
    } else {
      return <div><button onClick={() => startTask(0)}>Start Task</button></div>
    }
  }

  return (
    //sprawdz czy bohater ma rozpoczety tasks
      //sprawdz czy czas taska uplynal
        //wyswietl liste taskow lub aktualny task lub zakonczenie taska

    <div>
      {pageSelector()}
    </div>
  )
}

export default MeetingRoom;
