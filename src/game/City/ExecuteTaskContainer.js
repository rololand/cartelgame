import React from 'react';
import displayTime from './../../utils/displayTime.js';

const ExecuteTaskContainer = (props) => {
  const url = 'http://localhost:3000/db/tasks/' + props.task.imgUrl;
  let remainingTaskDuration = props.remainingTaskDuration
  remainingTaskDuration = Number.isInteger(remainingTaskDuration) ?
                                  remainingTaskDuration :
                                  props.task.taskDuration
  const taskElapsedTime = props.task.taskDuration - remainingTaskDuration
  return (
    <div>
      <h1>{props.task.name}</h1>
      <img className="cardImg" src={url} alt={''}/><br />
      {displayTime(remainingTaskDuration)} <br />
      <progress value={taskElapsedTime}
                max={props.task.taskDuration}>
      </progress>
    </div>
  )
}

export default ExecuteTaskContainer;
