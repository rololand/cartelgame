import React from 'react';
import './FinishedTaskContainer.css';

const FinishedTaskContainer = (props) => {
  const url = 'https://rololand.github.io/cartelgame/db/tasks/' + props.task.imgUrl;

  return (
    <div>
      <h1>Ukończono zadanie!</h1>
      <h2>{props.task.name}</h2>
      <img className="taskFinishedImg" src={url} alt={''}/><br />
      <div>
        Złoto: {props.task.gold} <br />
        Exp: {props.task.exp} <br />
        Item name: {props.task.item ? props.task.item.name : ''}<br />
        Item description: {props.task.item ? props.task.item.description : ''}<br />
        Szansa na złapanie: {props.prisonChance < 0 ? 0 : props.prisonChance }%<br />
        <button onClick={() => props.calculateTask()}>Calculate Task</button>
      </div>
    </div>
  )
}

export default FinishedTaskContainer;
