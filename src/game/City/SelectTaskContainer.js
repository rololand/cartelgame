import React from 'react';
import TaskCard from './TaskCard.js';
import './SelectTaskContainer.css';

const SelectTaskContainer = (props) => {
  return (
    <div className="SelectTaskContainer row">
      <TaskCard startTask={props.startTask.bind(this)}
                task={props.tasksList[props.selectedTasksList[0]]}
                gold={props.gold[0]}
                exp={props.exp[0]}/>
      <TaskCard startTask={props.startTask.bind(this)}
                task={props.tasksList[props.selectedTasksList[1]]}
                gold={props.gold[1]}
                exp={props.exp[1]}/>
      <TaskCard startTask={props.startTask.bind(this)}
                task={props.tasksList[props.selectedTasksList[2]]}
                gold={props.gold[2]}
                exp={props.exp[2]}/>
    </div>
  )
}

export default SelectTaskContainer;
