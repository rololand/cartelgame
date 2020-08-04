import React from 'react';
import './TaskCard.css';
import displayTime from './../../utils/displayTime.js';

const TaskCard = (props) => {
  let id = props.id;
  const url = 'http://localhost:3000/db/tasks/' + props.task.imgUrl[id];
  return (
    <div className="TaskCard">
      <img className="taskCardImg" src={url} alt={''}/><br />
      <h1>{props.task.name[id]}</h1>
      <p>{props.task.description[id]}</p>
      gold: {props.task.gold[id]}<br />
      exp: {props.task.exp[id]}<br />
      time: {displayTime(props.task.taskDuration[id])}<br />
      <button onClick={() => props.startTask(props.task, id)}>Start Task</button>
    </div>
  )
}

export default TaskCard;
