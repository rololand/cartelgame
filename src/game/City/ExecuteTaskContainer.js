import React from 'react';
import displayTime from './../../utils/displayTime.js';

function ExecuteTaskContainer(props) {


  const url = 'http://localhost:3000/db/tasks/' + props.imgUrl;

  return (
    <div>
      <h1>{props.taskTitle}</h1>
      <img className="taskCardImg" src={url} alt={''}/><br />
      {displayTime(props.time)} <br />
      <progress value={props.taskDuration - props.time}
                max={props.taskDuration}>
      </progress>
    </div>
  )
}

export default ExecuteTaskContainer;
