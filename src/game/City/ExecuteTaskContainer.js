import React from 'react';
import displayTime from './../../utils/displayTime.js';

const ExecuteTaskContainer = (props) => {
  const url = 'http://localhost:3000/db/tasks/' + props.task.imgUrl;

  return (
    <div>
      <h1>{props.task.name}</h1>
      <img className="taskCardImg" src={url} alt={''}/><br />
      {displayTime(props.time)} <br />
      <progress value={props.task.taskDuration - props.time}
                max={props.task.taskDuration}>
      </progress>
    </div>
  )
}

export default ExecuteTaskContainer;
