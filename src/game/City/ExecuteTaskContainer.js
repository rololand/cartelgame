import React from 'react';
import displayTime from './../../utils/displayTime';
import ProgressBar from './../../utils/ProgressBar';

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
      <ProgressBar value={taskElapsedTime}
                max={props.task.taskDuration} />
    </div>
  )
}

export default ExecuteTaskContainer;
