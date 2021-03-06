import React from 'react';
import SelectTaskContainer from './SelectTaskContainer.js'
import ExecuteTaskContainer from './ExecuteTaskContainer.js'
import FinishedTaskContainer from './FinishedTaskContainer.js'

const City = (props) => {

  const pageSelector = () => {
    if(props.task.isStarted) {
      if(props.task.isFinished)
        return <FinishedTaskContainer   task={props.task}
                                        prisonChance={props.prisonChance}
                                        calculateTask={props.calculateTask}/>
      else
        return <ExecuteTaskContainer  remainingTaskDuration={props.remainingTaskDuration}
                                      task={props.task}/>
    } else {
      return <SelectTaskContainer   startTask={props.startTask.bind(this)}
                                    task={props.task}
                                    prisonChance={props.prisonChance}/>
    }
  }

  return (
    <div>
      {pageSelector()}
    </div>
  )
}

export default City;
