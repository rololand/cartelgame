import React from 'react';
import './TaskCard.css';
import displayTime from './../../utils/displayTime.js';

const TaskCard = (props) => {
  let id = props.id;
  const url = 'https://rololand.github.io/cartelgame/db/tasks/' + props.task.imgUrl[id];
  return (
    <div className="card">
      <img className="cardImg" src={url} alt={''}/><br />
      <h1>{props.task.name[id]}</h1>
      <p className="cardDescription">{props.task.description[id]}</p>
      gold: {props.task.gold[id]}<br />
      exp: {props.task.exp[id]}<br />
      time: {displayTime(props.task.taskDuration[id])}<br />
      Szansa na złapanie: {props.prisonChance < 0 ? 0 : props.prisonChance }%<br />
      <button onClick={() => props.startTask(props.task, id)}>Start Task</button>
    </div>
  )
}

export default TaskCard;
