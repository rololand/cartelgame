import React from 'react';
import './TaskCard.css'

function TaskCard(props) {

  return (
    <div className="TaskCard">
      {props.task.imgUrl}<br />
      {props.task.name}<br />
      {props.task.description}<br />
      gold: {props.gold}<br />
      exp: {props.exp}<br />
      time: {props.task.time}<br />
      <button onClick={() => props.startTask(props.task.id, props.gold, props.exp)}>Start Task</button>
    </div>
  )
}

export default TaskCard;
