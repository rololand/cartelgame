import React from 'react';
import TaskCard from './TaskCard.js';
import './SelectTaskContainer.css';

const SelectTaskContainer = (props) => {
  return (
    <div className="SelectTaskContainer row">
      {[0, 1, 2].map((id) => 
        <TaskCard startTask={props.startTask.bind(this)}
                  task={props.tasksList[props.task.selectedTasksList[id]]}
                  gold={props.task.gold[id]}
                  exp={props.task.exp[id]}/>
      )}
    </div>
  )
}

export default SelectTaskContainer;
