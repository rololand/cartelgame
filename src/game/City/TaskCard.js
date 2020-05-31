import React from 'react';
import './TaskCard.css';
import displayTime from './../../utils/displayTime.js';

function TaskCard(props) {
  const url = 'http://localhost:3000/db/tasks/' + props.task.imgUrl;
  return (
    <div className="TaskCard">
      <img className="taskCardImg" src={url} alt={''}/><br />
      <h1>{props.task.name}</h1>
      <p>{props.task.description}</p>
      gold: {props.gold}<br />
      exp: {props.exp}<br />
      time: {displayTime(props.task.time)}<br />
      <button onClick={() => props.startTask(props.task.id, props.gold, props.exp)}>Start Task</button>
    </div>
  )
}

export default TaskCard;
